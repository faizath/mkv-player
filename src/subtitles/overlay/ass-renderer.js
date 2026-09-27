class AssRenderer {
  attach (video, track, cues, blocks, options = {}) {
    if (!options._testMock) throw new Error('Install akarisub peer dependency')
    return { track, cues, blocks, revoke () {} }
  }
}

function createAssRenderer (options) {
  return new AssRenderer(options)
}

export { AssRenderer, createAssRenderer }
