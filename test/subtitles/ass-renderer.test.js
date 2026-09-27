import { describe, expect, it, vi } from 'vitest'
import { CODEC_IDS, TRACK_TYPES } from '../../src/core/constants'
import { assData } from '../../src/subtitles/extract'
import { createAssRenderer, setAkariModuleLoader } from '../../src/subtitles/overlay/ass-renderer.js'

describe('ASS libass renderer', () => {
  it('builds styled ASS content from track metadata', () => {
    const track = {
      number: 1,
      type: TRACK_TYPES.SUBTITLE,
      codecId: CODEC_IDS.S_TEXT_ASS,
      codecPrivate: '[Script Info]\r\nTitle: Test\r\n\r\n[Events]\r\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\r\n'
    }
    const cues = [{ startMs: 0, endMs: 1000, text: 'Hello', format: 'ass' }]
    const blocks = [{ data: 'Dialogue: 0,0:00:00.00,0:00:01.00,Default,,0,0,0,,Hello' }]
    const content = assData(track, cues, blocks)
    expect(content).toContain('[Script Info]')
    expect(content).toContain('Dialogue:')
  })

  it('creates akarisub renderer when module is available', async () => {
    const destroy = vi.fn()
    setAkariModuleLoader(async () => {
      return class MockAkariSub {
        constructor (options) {
          this.options = options
        }

        destroy () {
          destroy()
        }
      }
    })
    const video = {}
    const track = { number: 1, codecId: CODEC_IDS.S_TEXT_ASS, codecPrivate: '' }
    const entry = await createAssRenderer().attach(video, track, [], [], { _testMock: false })
    expect(entry.format).toBe('ass')
    entry.revoke()
    expect(destroy).toHaveBeenCalled()
    setAkariModuleLoader(null)
  })
})
