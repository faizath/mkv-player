/* global globalThis */
import { describe, expect, it, afterEach } from 'vitest'
import { CODEC_IDS, TRACK_TYPES } from '../../src/core/constants'
import { hevcCodecString } from '../../src/playback/hevc/hevc-codec'
import { hevcSample } from '../../src/playback/hevc/remux-hevc'
import { createInitSegment } from '../../src/playback/remux'
import { resolvePlaybackStrategy } from '../../src/playback/strategy'

const codecPrivate = new Uint8Array([
  1, 1, 0, 0, 0, 6, 0xb0, 0, 0, 0, 0, 0, 93, 0xf0, 0, 0xfc, 0xfd, 0xf8, 248, 0, 0, 0
])

afterEach(() => {
  delete globalThis.MediaSource
})

describe('HEVC playback', () => {
  it('builds an HEVC codec string from hvcC', () => {
    expect(hevcCodecString(codecPrivate)).toBe('hvc1.1.6.L93.B0')
  })

  it('converts Annex-B samples to length-prefixed NAL units', () => {
    const sample = hevcSample(new Uint8Array([0, 0, 0, 1, 0x40, 1, 0, 0, 1, 0x26, 2]))
    expect(Array.from(sample)).toEqual([0, 0, 0, 2, 0x40, 1, 0, 0, 0, 2, 0x26, 2])
  })

  it('creates an hvc1 sample entry with hvcC', async () => {
    const data = new Uint8Array(await (await createInitSegment([{
      number: 1,
      type: TRACK_TYPES.VIDEO,
      codecId: CODEC_IDS.V_MPEGH_HEVC,
      codecPrivate,
      width: 1920,
      height: 1080
    }])).buffer)
    const text = new TextDecoder().decode(data)
    expect(text).toContain('hvc1')
    expect(text).toContain('hvcC')
  })

  it('selects HEVC remux when MSE supports the codec', () => {
    globalThis.MediaSource = {
      isTypeSupported: type => type.includes('hvc1.1.6.L93.B0')
    }
    const strategy = resolvePlaybackStrategy([{
      number: 1,
      type: TRACK_TYPES.VIDEO,
      codecId: CODEC_IDS.V_MPEGH_HEVC,
      codecPrivate
    }])
    expect(strategy).toMatchObject({ strategy: 'remux-hevc', supported: true })
  })
})
