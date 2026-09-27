import { OverlayManager } from '../subtitles/overlay/overlay-manager.js'
import { cuesToVtt, stripAssTags } from '../subtitles/overlay/vtt-track-renderer.js'

async function attachSubtitleTracks (videoElement, demuxResult, options = {}) {
  const manager = new OverlayManager(videoElement, { ...options, createCanvas: false })
  await manager.attachFromDemux(demuxResult, options)
  return manager
}

export { attachSubtitleTracks, cuesToVtt, stripAssTags }
