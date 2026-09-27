/* global AbortController */
import { describe, expect, it } from 'vitest'
import demux from '../../src/core/demuxer.js'

describe('demux abort support', () => {
  it('rejects immediately when the signal is already aborted', async () => {
    const controller = new AbortController()
    controller.abort()
    await expect(demux(new ArrayBuffer(0), { signal: controller.signal }))
      .rejects.toMatchObject({ name: 'AbortError' })
  })
})
