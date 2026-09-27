/* global Blob */
/* eslint-disable no-new-func */
let ffmpeg = null
let loadPromise = null
const dynamicImport = new Function('specifier', 'return import(specifier)')

const DEFAULT_CORE_URL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js'
const DEFAULT_WASM_URL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm'

async function defaultFfmpegModuleLoader () {
  try {
    const ffmpegModule = await dynamicImport('@ffmpeg/ffmpeg')
    const utilModule = await dynamicImport('@ffmpeg/util')
    return { FFmpeg: ffmpegModule.FFmpeg, toBlobURL: utilModule.toBlobURL }
  } catch (error) {
    const missing = new Error('Install @ffmpeg/ffmpeg and @ffmpeg/util to enable transcode')
    missing.cause = error
    throw missing
  }
}

let ffmpegModuleLoader = defaultFfmpegModuleLoader

function setFfmpegModuleLoader (loader) {
  ffmpegModuleLoader = loader || defaultFfmpegModuleLoader
}

async function loadFfmpeg (options = {}) {
  if (ffmpeg) return ffmpeg
  if (loadPromise) return loadPromise
  loadPromise = (async () => {
    const { FFmpeg, toBlobURL } = await ffmpegModuleLoader()
    const instance = new FFmpeg()
    const coreURL = options.coreURL || DEFAULT_CORE_URL
    const wasmURL = options.wasmURL || DEFAULT_WASM_URL
    await instance.load({
      coreURL: await toBlobURL(coreURL, 'text/javascript'),
      wasmURL: await toBlobURL(wasmURL, 'application/wasm')
    })
    if (typeof options.onProgress === 'function') {
      instance.on('progress', ({ progress }) => options.onProgress(Math.round(progress * 100), 'transcode'))
    }
    ffmpeg = instance
    return instance
  })()
  try {
    return await loadPromise
  } catch (error) {
    loadPromise = null
    throw error
  }
}

async function transcodeToMp4 (input, options = {}) {
  const instance = await loadFfmpeg(options)
  const data = input instanceof Uint8Array
    ? input
    : new Uint8Array(input instanceof ArrayBuffer ? input : await input.arrayBuffer())
  await instance.writeFile('input.mkv', data)
  await instance.exec([
    '-i', 'input.mkv',
    '-c:v', 'libx264',
    '-preset', options.preset || 'fast',
    '-crf', '23',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-movflags', '+faststart',
    'output.mp4'
  ])
  const output = await instance.readFile('output.mp4')
  return { blob: new Blob([output], { type: 'video/mp4' }), mimeType: 'video/mp4' }
}

function terminateFfmpeg () {
  if (ffmpeg) ffmpeg.terminate()
  ffmpeg = null
  loadPromise = null
}

export { loadFfmpeg, transcodeToMp4, terminateFfmpeg, setFfmpegModuleLoader }
