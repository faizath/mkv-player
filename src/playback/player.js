import demux from '../core/demuxer.js'
import { resolvePlaybackStrategy } from './strategy.js'
import { remuxToMp4 } from './remux.js'
import { MSEPlayer } from './mse-player.js'
import { OverlayManager } from '../subtitles/overlay/overlay-manager.js'
import { TRACK_TYPES } from '../core/constants.js'
import { createWorkerClient } from '../browser/worker-client.js'
import { createBlobUrl, revokeBlobUrl } from '../browser/blob-manager.js'
import { executeTranscodePlayback } from './strategies/transcode-strategy.js'

class MKVPlayer {
  constructor (videoElement, options = {}) {
    if (!videoElement) throw new TypeError('MKVPlayer requires a video element')
    this.video = videoElement
    this.options = {
      assRenderer: 'auto',
      bitmapSubtitles: 'auto',
      transcode: false,
      ...options
    }
    this.mse = null
    this.fallbackUrl = null
    this.overlayManager = null
    this.result = null
    this.support = null
    this.workerClient = null
  }

  async load (source, loadOptions = {}) {
    this.destroy()
    const options = { ...this.options, ...loadOptions }
    const demuxOptions = {
      collectMediaBlocks: true,
      signal: options.signal,
      onProgress: options.onProgress
    }
    const result = options.useWorker
      ? await (this.workerClient || (this.workerClient = createWorkerClient(options))).demux(
        source instanceof ArrayBuffer ? source.slice(0) : await source.arrayBuffer(), demuxOptions)
      : await demux(source, demuxOptions)
    const support = resolvePlaybackStrategy(result.tracks, options)
    if (!support.supported) throw new Error(support.reason)
    this.result = result
    this.support = support
    if (support.strategy === 'transcode') {
      const transcoded = await executeTranscodePlayback(this.video, source, options)
      this.fallbackUrl = transcoded.url
      this.overlayManager = new OverlayManager(this.video, options)
      await this.overlayManager.attachFromDemux(result, options)
      if (typeof options.onProgress === 'function') options.onProgress(100, 0)
      return this
    }
    if (support.strategy !== 'remux-mse' && support.strategy !== 'remux-hevc') {
      throw new Error(`${support.strategy} playback is not yet implemented`)
    }
    try {
      this.mse = new MSEPlayer(this.video, options)
      await this.mse.load(result, { signal: options.signal })
    } catch (error) {
      if (this.mse) this.mse.destroy()
      this.mse = null
      try {
        const remuxed = await remuxToMp4(result, options)
        this.fallbackUrl = createBlobUrl(remuxed.blob)
        this.video.src = this.fallbackUrl
      } catch (remuxError) {
        if (options.transcode !== 'auto') throw remuxError
        const transcoded = await executeTranscodePlayback(this.video, source, options)
        this.fallbackUrl = transcoded.url
      }
    }
    this.overlayManager = new OverlayManager(this.video, options)
    await this.overlayManager.attachFromDemux(result, options)
    if (typeof options.onProgress === 'function') options.onProgress(100, 0)
    return this
  }

  destroy () {
    if (this.mse) this.mse.destroy()
    if (this.overlayManager) this.overlayManager.destroy()
    if (this.fallbackUrl) {
      revokeBlobUrl(this.fallbackUrl)
      this.video.removeAttribute('src')
      this.video.load()
    }
    this.mse = null
    this.overlayManager = null
    this.fallbackUrl = null
    this.result = null
    this.support = null
    if (this.workerClient) this.workerClient.terminate()
    this.workerClient = null
  }

  getTracks () {
    if (!this.result) return { video: [], audio: [], subtitles: [] }
    return {
      video: this.result.tracks.filter(track => track.type === TRACK_TYPES.VIDEO),
      audio: this.result.tracks.filter(track => track.type === TRACK_TYPES.AUDIO),
      subtitles: this.result.tracks.filter(track => track.type === TRACK_TYPES.SUBTITLE)
    }
  }

  async downloadMp4 () {
    if (!this.result) throw new Error('No media has been loaded')
    const { blob } = await remuxToMp4(this.result, this.options)
    const filename = this.options.filename || 'video.mp4'
    if (typeof this.options.saveAs === 'function') {
      this.options.saveAs(blob, filename)
      return blob
    }
    const anchor = document.createElement('a')
    anchor.href = createBlobUrl(blob)
    anchor.download = filename
    anchor.click()
    setTimeout(() => revokeBlobUrl(anchor.href), 0)
    return blob
  }
}

function createPlayer (videoElement, options) {
  return new MKVPlayer(videoElement, options)
}

export { MKVPlayer, createPlayer }
