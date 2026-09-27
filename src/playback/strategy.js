import { CODEC_IDS, TRACK_TYPES } from '../core/constants.js'
import { isHevcMseSupported } from './hevc/mse-probe.js'

function resolvePlaybackStrategy (tracks, options = {}) {
  const transcodeEnabled = options.transcode === true || options.transcode === 'auto'
  const videoTrack = tracks.find(track => track.type === TRACK_TYPES.VIDEO)
  const audioTrack = tracks.find(track => track.type === TRACK_TYPES.AUDIO)
  const codecs = [videoTrack, audioTrack].filter(Boolean).map(track => track.codecId)
  if (!videoTrack && !audioTrack) {
    return { strategy: 'unsupported', supported: false, reason: 'No video or audio tracks found', videoTrack, audioTrack, codecs }
  }
  if (videoTrack && videoTrack.codecId === CODEC_IDS.V_MPEGH_HEVC) {
    if (transcodeEnabled) {
      return { strategy: 'transcode', supported: true, reason: 'HEVC requires remux or transcode', videoTrack, audioTrack, codecs }
    }
    if (isHevcMseSupported(videoTrack.codecPrivate)) {
      return { strategy: 'remux-hevc', supported: true, videoTrack, audioTrack, codecs }
    }
    return { strategy: 'transcode', supported: false, reason: 'HEVC requires remux or transcode', videoTrack, audioTrack, codecs }
  }
  const supportedVideo = !videoTrack || videoTrack.codecId === CODEC_IDS.V_MPEG4_ISO_AVC || videoTrack.codecId === 'V_AV1'
  const supportedAudio = !audioTrack || audioTrack.codecId === CODEC_IDS.A_AAC || audioTrack.codecId === CODEC_IDS.A_MPEG_L3
  if (!supportedVideo || !supportedAudio) {
    const reason = !supportedVideo
      ? `Unsupported video codec: ${videoTrack.codecId || 'unknown'}`
      : `Unsupported audio codec: ${audioTrack.codecId || 'unknown'}`
    if (transcodeEnabled) return { strategy: 'transcode', supported: true, reason, videoTrack, audioTrack, codecs }
    return { strategy: 'unsupported', supported: false, reason, videoTrack, audioTrack, codecs }
  }
  return { strategy: 'remux-mse', supported: true, videoTrack, audioTrack, codecs }
}

export { resolvePlaybackStrategy }
