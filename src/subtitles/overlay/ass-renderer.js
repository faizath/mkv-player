/* eslint-disable no-new-func */
import { assData } from '../extract.js'
import { loadEmbeddedFonts } from './font-loader.js'

const dynamicImport = new Function('specifier', 'return import(specifier)')

async function defaultAkariModuleLoader () {
  try {
    const mod = await dynamicImport('akarisub')
    return mod.default || mod.AkariSub
  } catch (error) {
    const missing = new Error('Install akarisub peer dependency to enable styled ASS subtitles')
    missing.cause = error
    throw missing
  }
}

let akariModuleLoader = defaultAkariModuleLoader

function setAkariModuleLoader (loader) {
  akariModuleLoader = loader || defaultAkariModuleLoader
}

class AssRenderer {
  async attach (video, track, cues, blocks, options = {}) {
    if (options._testMock) {
      return { track, format: 'ass', revoke () {} }
    }
    const subContent = assData(track, cues, blocks)
    const AkariSub = await akariModuleLoader()
    const fonts = await loadEmbeddedFonts(options.demuxResult, options)
    const renderer = new AkariSub({
      video,
      subContent,
      canvas: options.canvas,
      workerUrl: options.overlay && options.overlay.assWorkerUrl,
      wasmUrl: options.overlay && options.overlay.assWasmUrl
    })
    return {
      track,
      format: 'ass',
      renderer,
      revoke () {
        if (renderer && typeof renderer.destroy === 'function') renderer.destroy()
        if (fonts && fonts.revoke) fonts.revoke()
      }
    }
  }
}

function createAssRenderer () {
  return new AssRenderer()
}

export { AssRenderer, createAssRenderer, setAkariModuleLoader }
