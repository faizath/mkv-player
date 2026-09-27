import { CODEC_IDS, TRACK_TYPES } from '../core/constants.js'

function isWebSafeVideo (codecId) {
  return codecId === CODEC_IDS.V_MPEG4_ISO_AVC || codecId === 'V_AV1'
}

function isWebSafeAudio (codecId) {
  return codecId === CODEC_IDS.A_AAC || codecId === CODEC_IDS.A_MPEG_L3
}

function getPlaybackSupport (tracks) {
  const videoTrack = tracks.find(track => track.type === TRACK_TYPES.VIDEO)
  const audioTrack = tracks.find(track => track.type === TRACK_TYPES.AUDIO)
  const reasons = []
  if (!videoTrack && !audioTrack) reasons.push('No video or audio tracks found')
  if (videoTrack && !isWebSafeVideo(videoTrack.codecId)) {
    reasons.push(`Unsupported video codec: ${videoTrack.codecId || 'unknown'}`)
  }
  if (audioTrack && !isWebSafeAudio(audioTrack.codecId)) {
    reasons.push(`Unsupported audio codec: ${audioTrack.codecId || 'unknown'}`)
  }
  return {
    supported: reasons.length === 0 && Boolean(videoTrack || audioTrack),
    videoTrack,
    audioTrack,
    ...(reasons.length ? { reason: reasons.join('; ') } : {})
  }
}

export { isWebSafeVideo, isWebSafeAudio, getPlaybackSupport }
