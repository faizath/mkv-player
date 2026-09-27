const demux = require('./core/demuxer')
const extractSubtitles = require('./subtitles/extract')
const { extractCues } = extractSubtitles
const extractAttachments = require('./extract/attachments')

module.exports = { demux, extractSubtitles, extractCues, extractAttachments }
