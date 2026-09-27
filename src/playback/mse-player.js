/* global MediaSource */
import { remuxToMp4 } from './remux.js'
import { getPlaybackSupport } from './codecs.js'
import { createBlobUrl, revokeBlobUrl } from '../browser/blob-manager.js'
import { CODEC_IDS } from '../core/constants.js'
import { hevcCodecString } from './hevc/hevc-codec.js'

class MSEPlayer {
  constructor (videoElement, options = {}) {
    if (!videoElement) throw new TypeError('MSEPlayer requires a video element')
    this.video = videoElement
    this.options = options
    this.handlers = new Map()
    this.source = null
    this.buffer = null
    this.queue = []
    this.objectUrl = null
  }

  on (event, handler) {
    if (!this.handlers.has(event)) this.handlers.set(event, [])
    this.handlers.get(event).push(handler)
    return () => this.handlers.get(event).splice(this.handlers.get(event).indexOf(handler), 1)
  }

  emit (event, value) {
    ;(this.handlers.get(event) || []).forEach(handler => handler(value))
  }

  async load (demuxResult, loadOptions = {}) {
    const signal = loadOptions.signal || this.options.signal
    if (signal && signal.aborted) throw abortError()
    const support = getPlaybackSupport(demuxResult.tracks)
    if (!support.supported) throw new Error(support.reason)
    if (typeof MediaSource === 'undefined') throw new Error('MediaSource is not supported')
    const result = await remuxToMp4(demuxResult, this.options)
    if (signal && signal.aborted) throw abortError()
    const source = new MediaSource()
    this.source = source
    this.objectUrl = createBlobUrl(source)
    this.video.src = this.objectUrl
    await new Promise((resolve, reject) => {
      const onAbort = () => reject(abortError())
      if (signal) signal.addEventListener('abort', onAbort, { once: true })
      source.addEventListener('sourceopen', () => {
        if (signal && signal.aborted) {
          reject(abortError())
          return
        }
        try {
          const codecs = []
          if (support.videoTrack) codecs.push(codecString(support.videoTrack))
          if (support.audioTrack) codecs.push(codecString(support.audioTrack))
          this.buffer = source.addSourceBuffer(`video/mp4; codecs="${codecs.join(', ')}"`)
          this.buffer.addEventListener('updateend', () => this.flush(resolve))
          this.queue.push(awaitBuffer(result.blob))
          this.flush(resolve)
        } catch (error) {
          reject(error)
        }
        if (signal) signal.removeEventListener('abort', onAbort)
      }, { once: true })
      source.addEventListener('error', () => reject(new Error('MediaSource error')), { once: true })
    })
    this.emit('ready')
    return this
  }

  flush (resolve) {
    if (!this.buffer || this.buffer.updating || !this.queue.length) return
    const next = this.queue.shift()
    if (next && typeof next.then === 'function') {
      next.then(data => {
        this.buffer.appendBuffer(data)
        if (resolve) resolve()
      })
    } else {
      this.buffer.appendBuffer(next)
      if (resolve) resolve()
    }
    this.emit('progress')
  }

  destroy () {
    if (this.buffer) {
      this.buffer.removeEventListener('updateend', this.flush)
      if (this.source && this.source.readyState === 'open') this.source.endOfStream()
    }
    if (this.objectUrl) revokeBlobUrl(this.objectUrl)
    this.video.removeAttribute('src')
    this.video.load()
    this.queue = []
    this.buffer = null
    this.source = null
  }
}

function abortError () {
  const error = new Error('MSE load aborted')
  error.name = 'AbortError'
  return error
}

function awaitBuffer (blob) {
  return blob.arrayBuffer().then(buffer => new Uint8Array(buffer))
}

function codecString (track) {
  if (track.codecId === CODEC_IDS.V_MPEGH_HEVC) return hevcCodecString(track.codecPrivate)
  if (track.type === 1) {
    const data = track.codecPrivate instanceof Uint8Array ? track.codecPrivate : new Uint8Array(track.codecPrivate || [])
    if (data[0] === 1 && data.length >= 4) {
      return `avc1.${Array.from(data.slice(1, 4)).map(byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase()}`
    }
    return 'avc1.42E01E'
  }
  const config = track.codecPrivate instanceof Uint8Array ? track.codecPrivate : new Uint8Array(track.codecPrivate || [])
  const objectType = config.length ? (config[0] >> 3) : 2
  return `mp4a.40.${objectType}`
}

export { MSEPlayer }
