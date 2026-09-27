/* global Worker, document, location */
function createWorkerClient (options = {}) {
  const script = typeof document !== 'undefined' && document.currentScript
  const base = script ? script.src : location.href
  const defaultUrl = new URL(base.includes('/iife/') ? '../worker/mkv-worker.js' : 'worker/mkv-worker.js', base)
  const worker = options.worker || new Worker(options.workerUrl || defaultUrl, { type: 'module' })
  let nextId = 0
  const pending = new Map()

  worker.onmessage = event => {
    const message = event.data || {}
    const request = pending.get(message.id)
    if (!request) return
    if (message.type === 'progress') {
      if (request.onProgress) request.onProgress(message.percentage, message.eta)
      return
    }
    pending.delete(message.id)
    if (message.type === 'error') {
      const error = new Error(message.error)
      error.name = message.name || 'Error'
      request.reject(error)
      return
    }
    request.resolve(deserializeResult(message.result))
  }

  worker.onerror = event => {
    pending.forEach(request => request.reject(event.error || new Error(event.message || 'Worker error')))
    pending.clear()
  }

  return {
    demux (source, options = {}) {
      const id = ++nextId
      const transferable = source instanceof ArrayBuffer ? source : null
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject, onProgress: options.onProgress })
        if (options.signal) {
          if (options.signal.aborted) {
            pending.delete(id)
            reject(abortError())
            return
          }
          options.signal.addEventListener('abort', () => {
            if (!pending.has(id)) return
            pending.delete(id)
            reject(abortError())
          }, { once: true })
        }
        const workerOptions = { ...options }
        delete workerOptions.onProgress
        delete workerOptions.signal
        worker.postMessage({ type: 'demux', id, source, options: workerOptions }, transferable ? [transferable] : [])
      })
    },
    terminate () {
      pending.forEach(request => request.reject(new Error('Worker terminated')))
      pending.clear()
      worker.terminate()
    }
  }
}

function abortError () {
  const error = new Error('Demux aborted')
  error.name = 'AbortError'
  return error
}

function deserializeResult (result) {
  const blocksByTrack = new Map()
  ;(result.blocks || []).forEach(([trackNumber, blocks]) => {
    blocksByTrack.set(trackNumber, blocks.map(block => ({
      ...block,
      data: block.data && block.data.type === 'bytes'
        ? new Uint8Array(block.data.buffer)
        : block.data
    })))
  })
  return { ...result, blocksByTrack }
}

export { createWorkerClient }
