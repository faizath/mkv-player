import { describe, expect, it, vi } from 'vitest'
import { OverlayManager } from '../../src/subtitles/overlay/overlay-manager.js'
import { CODEC_IDS, TRACK_TYPES } from '../../src/core/constants.js'

function fixture (codecId = CODEC_IDS.S_TEXT_UTF8) {
  const children = []
  const doc = {
    createElement: tagName => {
      const element = {
        tagName,
        style: {},
        remove: () => {
          element.removed = true
        },
        setAttribute: () => {}
      }
      children.push(element)
      return element
    },
    addEventListener: () => {},
    removeEventListener: () => {}
  }
  const parent = { appendChild: element => { element.parentElement = parent } }
  const video = {
    ownerDocument: doc,
    parentElement: parent,
    appendChild: element => { element.parentElement = video }
  }
  const result = {
    tracks: [{ number: 3, type: TRACK_TYPES.SUBTITLE, codecId }],
    blocksByTrack: new Map([[3, [{ timecode: 0, duration: 1000, data: codecId === CODEC_IDS.S_TEXT_ASS ? '{\\an8}Hello' : 'Hello' }]]])
  }
  return { children, doc, video, result }
}

describe('subtitle overlay manager', () => {
  it('creates a canvas overlay', () => {
    const { doc, video } = fixture()
    const manager = new OverlayManager(video, { document: doc })
    expect(manager.canvas.style.pointerEvents).toBe('none')
    expect(manager.canvas.parentElement).toBeDefined()
    manager.destroy()
  })

  it('attaches text subtitles as WebVTT tracks', async () => {
    const { doc, video, result } = fixture()
    const manager = new OverlayManager(video, { document: doc })
    await manager.attachFromDemux(result)
    expect(manager.tracks[0].element.tagName).toBe('track')
    manager.destroy()
  })

  it('uses WebVTT for ASS text mode', async () => {
    const { doc, video, result } = fixture(CODEC_IDS.S_TEXT_ASS)
    const manager = new OverlayManager(video, { document: doc, assRenderer: 'text' })
    await manager.attachFromDemux(result)
    expect(manager.tracks[0].element.tagName).toBe('track')
    manager.destroy()
  })

  it('cleans up tracks and canvas', async () => {
    const { doc, video, result } = fixture()
    const manager = new OverlayManager(video, { document: doc })
    await manager.attachFromDemux(result)
    const canvas = manager.canvas
    const track = manager.tracks[0].element
    manager.destroy()
    expect(canvas.removed).toBe(true)
    expect(track.removed).toBe(true)
  })

  it('falls back when optional renderers are unavailable', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const ass = fixture(CODEC_IDS.S_TEXT_ASS)
    const assManager = new OverlayManager(ass.video, { document: ass.doc, assRenderer: 'libass' })
    await assManager.attachFromDemux(ass.result)
    expect(assManager.tracks[0].element.tagName).toBe('track')
    const pgs = fixture(CODEC_IDS.S_HDMV_PGS)
    const pgsManager = new OverlayManager(pgs.video, { document: pgs.doc })
    await pgsManager.attachFromDemux(pgs.result)
    expect(pgsManager.tracks).toHaveLength(0)
    expect(warn).toHaveBeenCalled()
    assManager.destroy()
    pgsManager.destroy()
    warn.mockRestore()
  })
})
