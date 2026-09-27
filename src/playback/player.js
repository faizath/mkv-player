import demux from '../core/demuxer.js'
import { getPlaybackSupport } from './codecs.js'
import { remuxToMp4 } from './remux.js'
import { MSEPlayer } from './mse-player.js'
import { attachSubtitleTracks } from './subtitles.js'
import { TRACK_TYPES } from '../core/constants.js'

class MKVPlayer {
  constructor (videoElement, options = {}) {
    if (!videoElement) throw new TypeError('MKVPlayer requires a video element')
    this.video = videoElement
    this.options = options
    this.mse = null
    this.fallbackUrl = null
    this.subtitleHandle = null
    this.result = null
    this.support = null
  }

  async load (source, loadOptions = {}) {
    this.destroy()
    const options = { ...this.options, ...loadOptions }
    const result = await demux(source, {
      collectMediaBlocks: true,
      signal: options.signal,
      onProgress: options.onProgress
    })
    const support = getPlaybackSupport(result.tracks)
    if (!support.supported) throw new Error(support.reason)

    this.result = result
    this.support = support
    try {
      this.mse = new MSEPlayer(this.video, options)
      await this.mse.load(result)
    } catch (error) {
      if (this.mse) this.mse.destroy()
      this.mse = null
      const remuxed = await remuxToMp4(result, options)
      this.fallbackUrl = URL.createObjectURL(remuxed.blob)
      this.video.src = this.fallbackUrl
    }
    this.subtitleHandle = await attachSubtitleTracks(this.video, result, options)
    if (typeof options.onProgress === 'function') options.onProgress(100, 0)
    return this
  }

  destroy () {
    if (this.mse) this.mse.destroy()
    if (this.subtitleHandle) this.subtitleHandle.revokeAll()
    if (this.video && this.video.querySelectorAll) {
      this.video.querySelectorAll('track').forEach(track => track.remove())
    }
    if (this.fallbackUrl) {
      URL.revokeObjectURL(this.fallbackUrl)
      this.video.removeAttribute('src')
      this.video.load()
    }
    this.mse = null
    this.subtitleHandle = null
    this.fallbackUrl = null
    this.result = null
    this.support = null
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
    anchor.href = URL.createObjectURL(blob)
    anchor.download = filename
    anchor.click()
    setTimeout(() => URL.revokeObjectURL(anchor.href), 0)
    return blob
  }
}

function createPlayer (videoElement, options) {
  return new MKVPlayer(videoElement, options)
}

export { MKVPlayer, createPlayer }
