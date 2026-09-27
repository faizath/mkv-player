const demux = require('./core/demuxer')
const extractSubtitles = require('./subtitles/extract')
const extractAttachments = require('./extract/attachments')

module.exports = { demux, extractSubtitles, extractAttachments }
