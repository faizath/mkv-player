/* global HTMLElement, customElements, fetch */
import { createPlayer } from '../playback/player.js'

const ElementBase = typeof HTMLElement === 'undefined' ? class {} : HTMLElement

function parseBooleanAttribute (element, name) {
  if (!element.hasAttribute(name)) return undefined
  const value = element.getAttribute(name)
  if (value === '' || value === 'true') return true
  if (value === 'false') return false
  if (value === 'auto') return 'auto'
  return value
}

class MKVPlayerElement extends ElementBase {
  constructor () {
    super()
    this.video = document.createElement('video')
    this.video.controls = true
    this.appendChild(this.video)
    this.player = null
  }

  connectedCallback () {
    this.addEventListener('dragover', preventDefault)
    this.addEventListener('drop', this.handleDrop)
    const src = this.getAttribute('src')
    if (src) this.load(src)
  }

  disconnectedCallback () {
    this.removeEventListener('drop', this.handleDrop)
    if (this.player) this.player.destroy()
  }

  set file (value) {
    if (value) this.load(value)
  }

  getPlayerOptions () {
    return {
      useWorker: this.hasAttribute('use-worker'),
      transcode: parseBooleanAttribute(this, 'transcode'),
      assRenderer: this.getAttribute('ass-renderer') || 'auto',
      bitmapSubtitles: parseBooleanAttribute(this, 'bitmap-subtitles')
    }
  }

  async load (source) {
    if (this.player) this.player.destroy()
    this.player = createPlayer(this.video, this.getPlayerOptions())
    if (typeof source === 'string') {
      const response = await fetch(source)
      if (!response.ok) throw new Error(`Unable to load ${source}: ${response.status}`)
      source = await response.blob()
    }
    return this.player.load(source)
  }

  handleDrop (event) {
    event.preventDefault()
    const file = event.dataTransfer && event.dataTransfer.files[0]
    if (file) this.load(file)
  }
}

function preventDefault (event) {
  event.preventDefault()
}

function registerMKVPlayerElement () {
  if (typeof customElements === 'undefined') return
  if (!customElements.get('mkv-player')) customElements.define('mkv-player', MKVPlayerElement)
}

export { MKVPlayerElement, registerMKVPlayerElement }
