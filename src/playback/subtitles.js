/* global Blob, URL, document */
import { convert } from 'srt2vtt'
import { extractCues } from '../subtitles/extract.js'
import { TRACK_TYPES } from '../core/constants.js'
import { createBlobUrl, revokeBlobUrl } from '../browser/blob-manager.js'

function cueTimestamp (milliseconds) {
  const total = Math.max(0, milliseconds || 0)
  const hours = Math.floor(total / 3600000)
  const minutes = Math.floor((total % 3600000) / 60000)
  const seconds = Math.floor((total % 60000) / 1000)
  const millis = Math.floor(total % 1000)
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(millis).padStart(3, '0')}`
}

function stripAssTags (text) {
  return String(text || '').replace(/\{[^}]*\}/g, '').replace(/\\N/g, '\n').replace(/\\n/g, '\n').replace(/\\h/g, ' ')
}

function cuesToSrt (cues) {
  return cues.map((cue, index) => `${index + 1}\n${cueTimestamp(cue.startMs).replace('.', ',')} --> ${cueTimestamp(cue.endMs).replace('.', ',')}\n${cue.text || ''}`).join('\n\n')
}

function cuesToVtt (cues, format) {
  if (format === 'ass') {
    return `WEBVTT\n\n${cues.map(cue => `${cueTimestamp(cue.startMs)} --> ${cueTimestamp(cue.endMs)}\n${stripAssTags(cue.text)}`).join('\n\n')}\n\n`
  }
  return convert(cuesToSrt(cues))
}

async function attachSubtitleTracks (videoElement, demuxResult, options = {}) {
  if (!videoElement || typeof videoElement.appendChild !== 'function') {
    throw new TypeError('attachSubtitleTracks requires a video element')
  }
  const doc = options.document || videoElement.ownerDocument ||
    (typeof document !== 'undefined' ? document : null)
  if (!doc || typeof doc.createElement !== 'function') {
    throw new Error('attachSubtitleTracks requires a document')
  }

  const subtitleTracks = (demuxResult.tracks || []).filter(track => track.type === TRACK_TYPES.SUBTITLE)
  const entries = []
  const blobUrls = []
  subtitleTracks.forEach((track, index) => {
    const cues = extractCues(demuxResult, track.number)
    const format = cues[0] ? cues[0].format : 'srt'
    const vtt = cuesToVtt(cues, format)
    const blobUrl = createBlobUrl(new Blob([vtt], { type: 'text/vtt' }))
    const element = doc.createElement('track')
    element.kind = 'subtitles'
    element.srclang = track.language || options.defaultLanguage || 'und'
    element.label = track.name || track.language || `Subtitle ${index + 1}`
    element.src = blobUrl
    element.default = Boolean(track.default)
    videoElement.appendChild(element)
    blobUrls.push(blobUrl)
    entries.push({ track, element, format, cues, src: blobUrl })
  })

  return {
    tracks: entries,
    revokeAll () {
      blobUrls.forEach(revokeBlobUrl)
    }
  }
}

export { attachSubtitleTracks, cuesToVtt, stripAssTags }
