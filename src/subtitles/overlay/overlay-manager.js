/* global document */
import { extractCues } from '../extract.js'
import { TRACK_TYPES, CODEC_IDS, isBitmapSubtitleCodec } from '../../core/constants.js'
import { VttTrackRenderer } from './vtt-track-renderer.js'
import { createAssRenderer } from './ass-renderer.js'
import { createPgsRenderer } from './pgs-renderer.js'

function createCanvasOverlay (videoElement, options = {}) {
  const doc = options.document || videoElement.ownerDocument ||
    (typeof document !== 'undefined' ? document : null)
  if (!doc || typeof doc.createElement !== 'function') {
    throw new Error('OverlayManager requires a document')
  }
  const canvas = doc.createElement('canvas')
  if (typeof canvas.setAttribute === 'function') canvas.setAttribute('aria-hidden', 'true')
  if (!canvas.style) canvas.style = {}
  canvas.style.position = 'absolute'
  canvas.style.inset = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.pointerEvents = 'none'
  canvas.style.objectFit = 'contain'
  const parent = videoElement.parentElement || videoElement
  if (parent && typeof parent.appendChild === 'function') parent.appendChild(canvas)
  return canvas
}

class OverlayManager {
  constructor (videoElement, options = {}) {
    if (!videoElement) throw new TypeError('OverlayManager requires a video element')
    this.video = videoElement
    this.options = {
      assRenderer: 'auto',
      bitmapSubtitles: 'auto',
      ...options
    }
    this.canvas = options.createCanvas === false ? null : createCanvasOverlay(videoElement, options)
    this.entries = []
    this.activeTrack = options.subtitleTrack
    this.visible = true
    this._fullscreenChange = () => this._handleFullscreen()
    const doc = options.document || videoElement.ownerDocument ||
      (typeof document !== 'undefined' ? document : null)
    if (doc && doc.addEventListener) doc.addEventListener('fullscreenchange', this._fullscreenChange)
  }

  async attachFromDemux (demuxResult, options = {}) {
    const merged = { ...this.options, ...options, demuxResult, canvas: this.canvas }
    const tracks = (demuxResult.tracks || []).filter(track => track.type === TRACK_TYPES.SUBTITLE)
    this._revokeEntries()
    const vttRenderer = new VttTrackRenderer()
    const entries = []
    for (let index = 0; index < tracks.length; index++) {
      const track = tracks[index]
      const cues = extractCues(demuxResult, track.number)
      const blocks = getBlocks(demuxResult, track.number)
      const isBitmap = isBitmapSubtitleCodec(track.codecId)
      if (isBitmap) {
        if (merged.bitmapSubtitles === false) continue
        try {
          entries.push(await createPgsRenderer(merged).attach(this.video, track, cues, blocks, merged))
        } catch (error) {
          warnFallback(error, 'bitmap subtitle')
        }
        continue
      }
      const wantsLibass = merged.assRenderer === 'libass' || merged.assRenderer === 'auto'
      if (isAss(track, cues) && wantsLibass) {
        try {
          entries.push(await createAssRenderer(merged).attach(this.video, track, cues, blocks, merged))
          continue
        } catch (error) {
          if (merged.assRenderer === 'libass') warnFallback(error, 'ASS subtitle')
        }
      }
      entries.push(vttRenderer.attach(this.video, demuxResult, track, {
        ...merged,
        cues,
        index
      }))
    }
    this.entries = entries
    this._applyTrackSelection()
    return this
  }

  setActiveTrack (trackNumber) {
    this.activeTrack = trackNumber
    this._applyTrackSelection()
  }

  setVisible (visible) {
    this.visible = Boolean(visible)
    if (this.canvas && this.canvas.style) this.canvas.style.display = this.visible ? '' : 'none'
    this.entries.forEach(entry => {
      if (entry.element && entry.element.track) {
        entry.element.track.mode = this.visible ? 'hidden' : 'disabled'
      }
    })
  }

  destroy () {
    this._revokeEntries()
    const doc = this.options.document || this.video.ownerDocument ||
      (typeof document !== 'undefined' ? document : null)
    if (doc && doc.removeEventListener) doc.removeEventListener('fullscreenchange', this._fullscreenChange)
    if (this.canvas && typeof this.canvas.remove === 'function') this.canvas.remove()
    this.canvas = null
  }

  revokeAll () {
    this.destroy()
  }

  get tracks () {
    return this.entries
  }

  _revokeEntries () {
    this.entries.forEach(entry => {
      if (entry.revoke) entry.revoke()
    })
    this.entries = []
  }

  _applyTrackSelection () {
    this.entries.forEach(entry => {
      if (!entry.element || !entry.element.track) return
      const selected = this.activeTrack == null || entry.track.number === this.activeTrack
      entry.element.track.mode = selected && this.visible ? 'hidden' : 'disabled'
    })
  }

  _handleFullscreen () {
    const doc = this.options.document || this.video.ownerDocument ||
      (typeof document !== 'undefined' ? document : null)
    const fullscreenElement = doc && doc.fullscreenElement
    if (!this.canvas || !fullscreenElement || typeof fullscreenElement.appendChild !== 'function') return
    if (fullscreenElement === this.video ||
      (typeof fullscreenElement.contains === 'function' && fullscreenElement.contains(this.video))) {
      fullscreenElement.appendChild(this.canvas)
    }
  }
}

function getBlocks (result, trackNumber) {
  const blocks = result.blocksByTrack instanceof Map
    ? result.blocksByTrack.get(trackNumber)
    : result.blocksByTrack && result.blocksByTrack[trackNumber]
  return (blocks || []).slice().sort((a, b) => a.timecode - b.timecode)
}

function isAss (track, cues) {
  return track.codecId === CODEC_IDS.S_TEXT_ASS ||
    track.codecId === CODEC_IDS.S_TEXT_SSA ||
    (cues[0] && cues[0].format === 'ass')
}

function warnFallback (error, kind) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn(`Unable to render ${kind}; skipping or falling back to WebVTT`, error)
  }
}

export { OverlayManager, createCanvasOverlay }
