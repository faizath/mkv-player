import { describe, expect, it } from 'vitest'
import { attachSubtitleTracks, cuesToVtt } from '../../src/playback/subtitles.js'
import { CODEC_IDS, TRACK_TYPES } from '../../src/core/constants.js'

describe('subtitle playback', () => {
  it('converts SRT cues to WebVTT with srt2vtt', () => {
    const output = cuesToVtt([{
      startMs: 1000,
      endMs: 2500,
      text: 'Hello'
    }], 'srt')
    expect(output).toContain('WEBVTT')
    expect(output).toContain('00:00:01.000 --> 00:00:02.500')
  })

  it('converts ASS cues to text-only WebVTT', () => {
    const output = cuesToVtt([{
      startMs: 0,
      endMs: 1000,
      text: '{\\an8}Hello\\Nworld'
    }], 'ass')
    expect(output).toContain('WEBVTT')
    expect(output).toContain('Hello\nworld')
    expect(output).not.toContain('\\an8')
  })

  it('creates one track element per subtitle track', async () => {
    const children = []
    const doc = {
      createElement: () => {
        const element = { remove: () => {}, setAttribute: () => {} }
        children.push(element)
        return element
      }
    }
    const video = { ownerDocument: doc, appendChild: element => element }
    const result = {
      tracks: [
        { number: 3, type: TRACK_TYPES.SUBTITLE, codecId: CODEC_IDS.S_TEXT_UTF8, language: 'en' },
        { number: 4, type: TRACK_TYPES.SUBTITLE, codecId: CODEC_IDS.S_TEXT_ASS, language: 'fr' }
      ],
      blocksByTrack: new Map([
        [3, [{ timecode: 0, duration: 1000, data: 'Hello' }]],
        [4, [{ timecode: 0, duration: 1000, data: '{\\i1}Bonjour' }]]
      ])
    }
    const handle = await attachSubtitleTracks(video, result, {
      document: doc
    })
    expect(handle.tracks).toHaveLength(2)
    expect(children).toHaveLength(2)
    handle.revokeAll()
  })
})
