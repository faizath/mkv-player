import { createExtractorUI } from './demo.js'
import { createWorkerClient } from './worker-client.js'
import { registerMKVPlayerElement } from './mkv-player-element.js'

export * from '../index.js'
export { createExtractorUI, createWorkerClient, registerMKVPlayerElement }

if (typeof customElements !== 'undefined') registerMKVPlayerElement()

if (typeof document !== 'undefined' && document.querySelector('.file-drop-area') &&
  !document.querySelector('#player-file')) {
  createExtractorUI()
}
