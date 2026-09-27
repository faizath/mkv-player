function extractAttachments (result) {
  return result.attachments.map(attachment => ({
    name: attachment.name,
    data: attachment.data
  }))
}

module.exports = extractAttachments
module.exports.extractAttachments = extractAttachments
