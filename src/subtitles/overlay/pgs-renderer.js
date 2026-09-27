class PgsRenderer {
  attach (video, track, cues, blocks, options = {}) {
    if (!options._testMock) throw new Error('Install libbitsub peer dependency')
    return { track, cues, blocks, revoke () {} }
  }
}

function createPgsRenderer (options) {
  return new PgsRenderer(options)
}

export { PgsRenderer, createPgsRenderer }
