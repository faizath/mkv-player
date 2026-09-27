/* eslint-disable no-new-func */
import { blocksToPgsBuffer } from '../bitmap/pgs-adapter.js'

const dynamicImport = new Function('specifier', 'return import(specifier)')

async function defaultPgsModuleLoader () {
  try {
    const mod = await dynamicImport('libbitsub')
    return mod.PgsRenderer
  } catch (error) {
    const missing = new Error('Install libbitsub peer dependency to enable PGS subtitles')
    missing.cause = error
    throw missing
  }
}

let pgsModuleLoader = defaultPgsModuleLoader

function setPgsModuleLoader (loader) {
  pgsModuleLoader = loader || defaultPgsModuleLoader
}

class PgsRendererAdapter {
  async attach (video, track, cues, blocks, options = {}) {
    if (options._testMock) {
      return { track, format: 'pgs', revoke () {} }
    }
    const PgsRenderer = await pgsModuleLoader()
    const subContent = blocksToPgsBuffer(blocks)
    const renderer = new PgsRenderer({
      video,
      subContent,
      canvas: options.canvas,
      workerUrl: options.overlay && options.overlay.pgsWorkerUrl,
      onError: error => {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('PGS renderer error', error)
        }
      }
    })
    return {
      track,
      format: 'pgs',
      renderer,
      revoke () {
        if (renderer && typeof renderer.dispose === 'function') renderer.dispose()
      }
    }
  }
}

function createPgsRenderer () {
  return new PgsRendererAdapter()
}

export { PgsRendererAdapter, createPgsRenderer, setPgsModuleLoader }
