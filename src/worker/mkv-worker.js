import demux from '../core/demuxer.js'

/* global self */
self.onmessage = async event => {
  const { type, id, source, options = {} } = event.data || {}
  if (type !== 'demux') return
  try {
    const result = await demux(source, {
      ...options,
      onProgress: (percentage, eta) => self.postMessage({ type: 'progress', id, percentage, eta })
    })
    const transfers = []
    const blocks = Array.from(result.blocksByTrack.entries()).map(([trackNumber, trackBlocks]) => [
      trackNumber,
      trackBlocks.map(block => {
        if (!(block.data instanceof Uint8Array)) return block
        const buffer = block.data.slice().buffer
        transfers.push(buffer)
        return { ...block, data: { type: 'bytes', buffer } }
      })
    ])
    self.postMessage({ type: 'result', id, result: { ...result, blocks, blocksByTrack: undefined } }, transfers)
  } catch (error) {
    self.postMessage({ type: 'error', id, name: error.name, error: error.message })
  }
}
