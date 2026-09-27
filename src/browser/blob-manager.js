/* global URL */
const urls = new Set()

function createBlobUrl (value) {
  const url = URL.createObjectURL(value)
  urls.add(url)
  return url
}

function revokeBlobUrl (url) {
  if (!url) return
  URL.revokeObjectURL(url)
  urls.delete(url)
}

function revokeAll () {
  urls.forEach(url => URL.revokeObjectURL(url))
  urls.clear()
}

export { createBlobUrl, revokeBlobUrl, revokeAll }
