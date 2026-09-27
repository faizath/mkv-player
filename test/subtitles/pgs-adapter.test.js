import { describe, expect, it } from 'vitest'
import { blocksToPgsBuffer } from '../../src/subtitles/bitmap/pgs-adapter.js'

describe('PGS adapter', () => {
  it('concatenates binary subtitle blocks', () => {
    const buffer = blocksToPgsBuffer([
      { data: new Uint8Array([1, 2, 3]) },
      { data: new Uint8Array([4, 5]) }
    ])
    expect(new Uint8Array(buffer)).toEqual(new Uint8Array([1, 2, 3, 4, 5]))
  })
})
