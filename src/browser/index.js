import { createExtractorUI } from './demo.js'

export * from '../index.js'
export { createExtractorUI }

if (typeof document !== 'undefined' && document.querySelector('.file-drop-area')) {
  createExtractorUI()
}
