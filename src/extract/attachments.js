function extractAttachments (result) {
  return result.attachments.map(attachment => ({
    name: attachment.name,
    data: attachment.data
  }))
}

export { extractAttachments }
export default extractAttachments
