/* global URL, document, Blob */
import { createBlobUrl, revokeBlobUrl } from '../../browser/blob-manager.js'

const FONT_MIME_PREFIXES = [
  'application/x-truetype-font',
  'application/vnd.ms-opentype',
  'font/otf',
  'font/ttf',
  'font/woff',
  'font/woff2'
]

function isFontAttachment (attachment) {
  const mime = String(attachment.mimeType || '').toLowerCase()
  const name = String(attachment.name || '').toLowerCase()
  return FONT_MIME_PREFIXES.some(prefix => mime.startsWith(prefix)) ||
    /\.(ttf|otf|woff2?)$/i.test(name)
}

async function loadEmbeddedFonts (demuxResult, options = {}) {
  const doc = options.document ||
    (typeof document !== 'undefined' ? document : null)
  const attachments = (demuxResult && demuxResult.attachments) || []
  const fontUrls = []
  const styleElements = []

  attachments.filter(isFontAttachment).forEach(attachment => {
    if (!attachment.data) return
    const mime = attachment.mimeType || 'font/otf'
    const blobUrl = createBlobUrl(new Blob([attachment.data], { type: mime }))
    fontUrls.push(blobUrl)
    if (doc && typeof doc.createElement === 'function') {
      const style = doc.createElement('style')
      const family = attachment.name ? attachment.name.replace(/\.[^.]+$/, '') : 'mkv-font'
      style.textContent = `@font-face{font-family:"${family}";src:url("${blobUrl}")}`
      if (doc.head && typeof doc.head.appendChild === 'function') doc.head.appendChild(style)
      styleElements.push(style)
    }
  })

  return {
    urls: fontUrls,
    revoke () {
      fontUrls.forEach(revokeBlobUrl)
      styleElements.forEach(element => {
        if (element && typeof element.remove === 'function') element.remove()
      })
    }
  }
}

export { loadEmbeddedFonts, isFontAttachment }
