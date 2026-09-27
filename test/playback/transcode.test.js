import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CODEC_IDS, TRACK_TYPES } from '../../src/core/constants'
import { resolvePlaybackStrategy } from '../../src/playback/strategy'
import {
  setFfmpegModuleLoader,
  terminateFfmpeg,
  transcodeToMp4
} from '../../src/playback/transcode/ffmpeg-client.js'

const exec = vi.fn()
const readFile = vi.fn(async () => new Uint8Array([1, 2, 3]))
const load = vi.fn()
const on = vi.fn()
const terminate = vi.fn()

class MockFFmpeg {
  load (...args) { return load(...args) }
  on (...args) { return on(...args) }
  writeFile (...args) { return Promise.resolve(args) }
  exec (...args) { return exec(...args) }
  readFile (...args) { return readFile(...args) }
  terminate (...args) { return terminate(...args) }
}

describe('ffmpeg transcode fallback', () => {
  beforeEach(() => {
    setFfmpegModuleLoader(async () => ({
      FFmpeg: MockFFmpeg,
      toBlobURL: async url => url
    }))
  })

  afterEach(() => {
    terminateFfmpeg()
    setFfmpegModuleLoader(null)
    vi.clearAllMocks()
  })

  it('executes the expected MP4 transcode command', async () => {
    const result = await transcodeToMp4(new Uint8Array([0]), { preset: 'slow' })
    expect(exec).toHaveBeenCalledWith([
      '-i', 'input.mkv', '-c:v', 'libx264', '-preset', 'slow', '-crf', '23',
      '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', 'output.mp4'
    ])
    expect(result.mimeType).toBe('video/mp4')
  })

  it('selects transcode for HEVC when enabled', () => {
    const strategy = resolvePlaybackStrategy([{
      type: TRACK_TYPES.VIDEO,
      codecId: CODEC_IDS.V_MPEGH_HEVC
    }], { transcode: true })
    expect(strategy).toMatchObject({ strategy: 'transcode', supported: true })
  })

  it('reports missing peer dependency clearly', async () => {
    setFfmpegModuleLoader(async () => {
      throw new Error('Install @ffmpeg/ffmpeg and @ffmpeg/util to enable transcode')
    })
    await expect(transcodeToMp4(new Uint8Array([0]))).rejects.toThrow(
      'Install @ffmpeg/ffmpeg and @ffmpeg/util to enable transcode'
    )
  })
})
