import { describe, expect, it, vi } from 'vitest'
import { CODEC_IDS } from '../../src/core/constants'
import { createPgsRenderer, setPgsModuleLoader } from '../../src/subtitles/overlay/pgs-renderer.js'

describe('PGS bitmap renderer', () => {
  it('creates libbitsub renderer when module is available', async () => {
    const dispose = vi.fn()
    setPgsModuleLoader(async () => {
      return class MockPgsRenderer {
        constructor (options) {
          this.options = options
        }

        dispose () {
          dispose()
        }
      }
    })
    const video = {}
    const track = { number: 2, codecId: CODEC_IDS.S_HDMV_PGS }
    const blocks = [{ data: new Uint8Array([0x50, 0x47]) }]
    const entry = await createPgsRenderer().attach(video, track, [], blocks, { _testMock: false })
    expect(entry.format).toBe('pgs')
    expect(entry.renderer.options.subContent).toBeInstanceOf(ArrayBuffer)
    entry.revoke()
    expect(dispose).toHaveBeenCalled()
    setPgsModuleLoader(null)
  })
})
