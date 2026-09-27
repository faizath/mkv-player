const { TRACK_TYPES, CODEC_IDS } = require('../core/constants')
const { formatTimestamp, formatTimestampSRT } = require('./format')

const DEFAULT_DURATION = 2000

function extractCues (result, trackNumber) {
  const track = result.tracks.find(item => item.number === trackNumber)
  if (!track) return []

  const blocks = getBlocks(result, trackNumber)
  const format = detectFormat(track, blocks)
  return blocks.map((block, index) => {
    const endMs = block.duration > 0
      ? block.timecode + block.duration
      : (blocks[index + 1] && blocks[index + 1].timecode > block.timecode
        ? blocks[index + 1].timecode
        : block.timecode + DEFAULT_DURATION)
    return {
      startMs: block.timecode,
      endMs,
      text: format === 'ass' ? assText(block.data, track.codecPrivate) : block.data,
      format
    }
  })
}

function extractSubtitles (result) {
  return result.tracks
    .filter(track => track.type === TRACK_TYPES.SUBTITLE)
    .map((track, index) => {
      const blocks = getBlocks(result, track.number)
      const cues = extractCues(result, track.number)
      const format = cues[0] ? cues[0].format : detectFormat(track, [])
      const name = 'Subtitle_' + (index + 1) + (format === 'ass' ? '.ass' : '.srt')
      return { name, data: format === 'ass' ? assData(track, cues, blocks) : srtData(cues) }
    })
}

function getBlocks (result, trackNumber) {
  const blocks = result.blocksByTrack instanceof Map
    ? result.blocksByTrack.get(trackNumber)
    : result.blocksByTrack && result.blocksByTrack[trackNumber]
  return (blocks || []).slice().sort((a, b) => a.timecode - b.timecode)
}

function detectFormat (track, blocks) {
  const codecId = track.codecId
  if (codecId === CODEC_IDS.S_TEXT_ASS || codecId === CODEC_IDS.S_TEXT_SSA) return 'ass'
  if (codecId === CODEC_IDS.S_TEXT_UTF8 || codecId === CODEC_IDS.S_TEXT_ASCII) return 'srt'
  const privateData = bufferToString(track.codecPrivate)
  if (/\[Events\][\s\S]*^\s*Format:/im.test(privateData)) return 'ass'
  return blocks.some(block => /^\s*Dialogue\s*:/i.test(block.data) ||
    /^\s*Format\s*:/im.test(block.data))
    ? 'ass'
    : 'srt'
}

function assData (track, cues, blocks) {
  const header = bufferToString(track.codecPrivate)
  const lines = cues.map((cue, index) => assDialogue(cue, track.codecPrivate,
    blocks[index] ? blocks[index].data : cue.text))
  if (!header) return lines.join('\r\n') + (lines.length ? '\r\n' : '')
  return header + (header.endsWith('\n') ? '' : '\r\n') + lines.join('\r\n') +
    (lines.length ? '\r\n' : '')
}

function assDialogue (cue, codecPrivate, data) {
  const fields = data.split(',')
  const format = assFormat(codecPrivate)
  const start = format.indexOf('start')
  const end = format.indexOf('end')
  if (start !== -1 && end !== -1) {
    fields[start] = formatTimestamp(cue.startMs)
    fields[end] = formatTimestamp(cue.endMs)
    return 'Dialogue: ' + fields.join(',')
  }
  return 'Dialogue: ' + [fields[0] || '0', formatTimestamp(cue.startMs),
    formatTimestamp(cue.endMs)].concat(fields.slice(1)).join(',')
}

function assText (data, codecPrivate) {
  const fields = data.split(',')
  const format = assFormat(codecPrivate)
  const textIndex = format.indexOf('text')
  return textIndex === -1 ? fields[fields.length - 1] : fields.slice(textIndex).join(',')
}

function assFormat (codecPrivate) {
  const match = bufferToString(codecPrivate).match(/^\s*Format:\s*([^\r\n]*)/im)
  return match ? match[1].split(',').map(field => field.trim().toLowerCase()) : []
}

function srtData (cues) {
  return cues.map((cue, index) => (index + 1) + '\r\n' +
    formatTimestampSRT(cue.startMs).replace('.', ',') + ' --> ' +
    formatTimestampSRT(cue.endMs).replace('.', ',') + '\r\n' +
    cue.text + '\r\n').join('\r\n')
}

function bufferToString (value) {
  return value == null ? '' : Buffer.from(value).toString('utf8')
}

module.exports = extractSubtitles
module.exports.extractSubtitles = extractSubtitles
module.exports.extractCues = extractCues
