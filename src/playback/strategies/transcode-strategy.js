import { transcodeToMp4 } from '../transcode/index.js'
import { createBlobUrl } from '../../browser/blob-manager.js'

async function executeTranscodePlayback (video, source, options = {}) {
  const result = await transcodeToMp4(source, options)
  const url = createBlobUrl(result.blob)
  video.src = url
  return { ...result, url }
}

export { executeTranscodePlayback }
