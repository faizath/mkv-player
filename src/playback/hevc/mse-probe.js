/* global MediaSource */

function isHevcMseSupported (codecPrivate) {
  if (typeof MediaSource === 'undefined' || typeof MediaSource.isTypeSupported !== 'function') return false
  const codec = hevcCodecString(codecPrivate)
  return Boolean(codec && MediaSource.isTypeSupported(`video/mp4; codecs="${codec}"`))
}

function hevcCodecString (codecPrivate) {
  const data = codecPrivate instanceof Uint8Array
    ? codecPrivate
    : typeof codecPrivate === 'string' ? new TextEncoder().encode(codecPrivate) : new Uint8Array(codecPrivate || [])
  if (data.length < 13 || data[0] !== 1) return 'hvc1.1.6.L93.B0'
  const profile = data[1] & 0x1f
  const compatibility = ((data[2] << 24) | (data[3] << 16) | (data[4] << 8) | data[5]) >>> 0
  const tier = (data[12] & 0x20) ? 'H' : 'L'
  const level = data[12] & 0x1f
  return `hvc1.${profile}.${compatibility.toString(16).toUpperCase()}.${tier}${level}`
}

export { isHevcMseSupported }
