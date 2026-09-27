import { describe, expect, it } from 'vitest'
import { CODEC_IDS, TRACK_TYPES } from '../../src/core/constants'
import { getPlaybackSupport } from '../../src/playback/codecs'
import { remuxToMp4 } from '../../src/playback/remux'

const tracks = [
  { number: 1, type: TRACK_TYPES.VIDEO, codecId: CODEC_IDS.V_MPEG4_ISO_AVC, codecPrivate: new Uint8Array([1, 0x42, 0, 0x1e]) },
  { number: 2, type: TRACK_TYPES.AUDIO, codecId: CODEC_IDS.A_AAC, codecPrivate: new Uint8Array([0x12, 0x10]) }
]

describe('playback', () => {
  it('reports supported H.264 and AAC tracks', () => {
    const support = getPlaybackSupport(tracks)
    expect(support.supported).toBe(true)
    expect(support.videoTrack).toBe(tracks[0])
    expect(support.audioTrack).toBe(tracks[1])
  })

  it('reports unsupported codecs', () => {
    const support = getPlaybackSupport([
      { number: 1, type: TRACK_TYPES.VIDEO, codecId: CODEC_IDS.V_MPEGH_HEVC }
    ])
    expect(support.supported).toBe(false)
    expect(support.reason).toContain('Unsupported video codec')
  })

  it('creates an MP4 blob with ftyp, moov, moof and mdat boxes', async () => {
    const result = await remuxToMp4({
      tracks,
      blocksByTrack: new Map([
        [1, [{ trackNumber: 1, blockTimestamp: 0, durationMs: 33, data: new Uint8Array([0, 0, 0, 2, 0x65, 0x88]), keyframe: true }]],
        [2, [{ trackNumber: 2, blockTimestamp: 0, durationMs: 21, data: new Uint8Array([1, 2, 3]) }]]
      ])
    })
    const data = new Uint8Array(await result.blob.arrayBuffer())
    expect(result.mimeType).toBe('video/mp4')
    expect(data.length).toBeGreaterThan(32)
    expect(new TextDecoder().decode(data.slice(4, 8))).toBe('ftyp')
    expect(new TextDecoder().decode(data.slice(36, 40))).toBe('moov')
    expect(boxes(data)).toEqual(expect.arrayContaining(['moof', 'mdat']))
  })
})

function boxes (data) {
  const result = []
  for (let i = 0; i + 4 <= data.length; i++) {
    const name = new TextDecoder().decode(data.slice(i, i + 4))
    if (name === 'moof' || name === 'mdat') result.push(name)
  }
  return result
}
