import { CODEC_IDS } from '../core/constants.js'
import { resolvePlaybackStrategy } from './strategy.js'

function isWebSafeVideo (codecId) {
  return codecId === CODEC_IDS.V_MPEG4_ISO_AVC || codecId === 'V_AV1'
}

function isWebSafeAudio (codecId) {
  return codecId === CODEC_IDS.A_AAC || codecId === CODEC_IDS.A_MPEG_L3
}

function getPlaybackSupport (tracks) {
  const strategy = resolvePlaybackStrategy(tracks)
  const reason = strategy.reason === 'HEVC requires remux or transcode'
    ? `Unsupported video codec: ${CODEC_IDS.V_MPEGH_HEVC}; ${strategy.reason}`
    : strategy.reason
  return {
    supported: strategy.supported,
    videoTrack: strategy.videoTrack,
    audioTrack: strategy.audioTrack,
    ...(reason ? { reason } : {})
  }
}

export { isWebSafeVideo, isWebSafeAudio, getPlaybackSupport }
