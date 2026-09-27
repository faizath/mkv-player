import { describe, expect, it } from 'vitest'
import extractSubtitles, { extractCues } from '../../src/subtitles/extract'
import { TRACK_TYPES, CODEC_IDS } from '../../src/core/constants'

function result (track, blocks) {
  return {
    tracks: [{ number: 1, type: TRACK_TYPES.SUBTITLE, ...track }],
    blocksByTrack: new Map([[1, blocks]])
  }
}

describe('subtitle extraction', () => {
  it('extracts SRT cues with timestamps and durations', () => {
    const input = result({ codecId: CODEC_IDS.S_TEXT_UTF8 }, [
      { timecode: 1000, duration: 1200, data: 'One' },
      { timecode: 3500, duration: 500, data: 'Two' }
    ])

    expect(extractCues(input, 1)).toEqual([
      { startMs: 1000, endMs: 2200, text: 'One', format: 'srt' },
      { startMs: 3500, endMs: 4000, text: 'Two', format: 'srt' }
    ])
    expect(extractSubtitles(input)[0].data).toContain('00:00:01,000 --> 00:00:02,200')
  })

  it('preserves the ASS header and replaces dialogue timestamps', () => {
    const header = '[Script Info]\r\nTitle: Test\r\n[Events]\r\nFormat: Layer, Start, End, Style, Text\r\n'
    const input = result({
      codecId: CODEC_IDS.S_TEXT_ASS,
      codecPrivate: Buffer.from(header, 'utf8')
    }, [{ timecode: 1250, duration: 2250, data: '0,old,old,Default,Hello' }])

    const file = extractSubtitles(input)[0]
    expect(file.name).toBe('Subtitle_1.ass')
    expect(file.data.startsWith(header)).toBe(true)
    expect(file.data).toContain('Dialogue: 0,0:00:01.25,0:00:03.50,Default,Hello')
    expect(extractCues(input, 1)[0].text).toBe('Hello')
  })

  it('uses the next cue and then a default duration when BlockDuration is missing', () => {
    const input = result({ codecId: CODEC_IDS.S_TEXT_ASCII }, [
      { timecode: 0, duration: 0, data: 'first' },
      { timecode: 3000, data: 'last' }
    ])

    expect(extractCues(input, 1).map(cue => cue.endMs)).toEqual([3000, 5000])
  })

  it('uses a BlockGroup duration supplied by the demuxer', () => {
    const input = result({ codecId: CODEC_IDS.S_TEXT_UTF8 }, [
      { timecode: 500, duration: 750, data: 'group cue', blockGroup: true }
    ])

    expect(extractCues(input, 1)[0].endMs).toBe(1250)
  })

  it('keeps UTF-8 subtitle text intact', () => {
    const input = result({ codecId: CODEC_IDS.S_TEXT_UTF8 }, [
      { timecode: 0, duration: 1000, data: 'こんにちは — café' }
    ])

    expect(extractCues(input, 1)[0].text).toBe('こんにちは — café')
  })

  it('detects ASS from CodecPrivate when CodecID is absent', () => {
    const input = result({
      codecPrivate: Buffer.from('[Events]\nFormat: Layer, Start, End, Text\n')
    }, [{ timecode: 0, duration: 1000, data: '0,0:00:00.00,0:00:01.00,Detected' }])

    expect(extractCues(input, 1)[0].format).toBe('ass')
  })
})
