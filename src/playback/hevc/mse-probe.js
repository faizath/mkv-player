/* global MediaSource */
import { hevcCodecString } from './hevc-codec.js'

function isHevcMseSupported (codecPrivate) {
  if (typeof MediaSource === 'undefined' || typeof MediaSource.isTypeSupported !== 'function') return false
  const codec = hevcCodecString(codecPrivate)
  return Boolean(codec && MediaSource.isTypeSupported(`video/mp4; codecs="${codec}"`))
}

export { isHevcMseSupported, hevcCodecString }
