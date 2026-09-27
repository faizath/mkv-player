const { TRACK_TYPES, CODEC_IDS } = require('../core/constants')
const { formatTimestamp, formatTimestampSRT } = require('./format')

function extractSubtitles (result) {
  const files = []
  result.tracks.filter(track => track.type === TRACK_TYPES.SUBTITLE).forEach((track, index) => {
    const blocks = result.blocksByTrack.get(track.number) || []
    const isASS = track.codecId === CODEC_IDS.S_TEXT_ASS ||
      track.codecId === CODEC_IDS.S_TEXT_SSA ||
      (blocks.length > 0 && blocks[0].data.indexOf('Format:') !== -1)
    const heading = track.codecPrivate
      ? track.codecPrivate.toString()
      : ''
    const formatFn = isASS ? formatTimestamp : formatTimestampSRT
    const eventMatches = isASS ? heading.match(/\[Events\]\s+Format:([^\r\n]*)/) : null
    const headingParts = isASS && eventMatches ? heading.split(eventMatches[0]) : ['', '']
    const fixedLines = []
    blocks.forEach((block, blockIndex) => {
      const duration = block.duration || 0
      const start = formatFn(block.timecode)
      const end = formatFn(block.timecode + duration)
      if (isASS) {
        const parts = block.data.split(',')
        const line = 'Dialogue: ' + [parts[1], start, end].concat(parts.slice(2)).join(',')
        fixedLines[parts[0]] = fixedLines[parts[0]]
          ? fixedLines[parts[0]] + '\r\n' + line
          : line
      } else {
        fixedLines.push((blockIndex + 1) + '\r\n' +
          start.replace('.', ',') + ' --> ' + end.replace('.', ',') + '\r\n' +
          block.data + '\r\n')
      }
    })
    const name = 'Subtitle_' + (index + 1) + (isASS ? '.ass' : '.srt')
    const data = isASS && eventMatches
      ? headingParts[0] + eventMatches[0] + '\r\n' + fixedLines.join('\r\n') + headingParts[1] + '\r\n'
      : fixedLines.join('\r\n')
    files.push({ name, data })
  })
  return files
}

module.exports = extractSubtitles
module.exports.extractSubtitles = extractSubtitles
