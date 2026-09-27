/* global Blob */
import fileReaderStream from 'filereader-stream'
import progressStream from 'progress-stream'
import { Readable } from 'stream'
import { TRACK_TYPES } from './constants.js'
import { createDecoder, readVint } from './ebml-reader.js'

function demux (source, options) {
  options = options || {}
  return new Promise((resolve, reject) => {
    let stream
    try {
      stream = sourceToStream(source)
    } catch (error) {
      reject(error)
      return
    }

    const result = {
      info: {},
      tracks: [],
      attachments: [],
      blocksByTrack: new Map()
    }
    const decoder = createDecoder()
    const state = {
      track: null,
      attachment: null,
      clusterTimecode: 0,
      trackByNumber: Object.create(null),
      timecodeScale: 1000000,
      stack: [],
      lastBlock: null
    }
    state.collectMediaBlocks = Boolean(options.collectMediaBlocks)
    let progress
    let settled = false

    const fail = error => {
      if (settled) return
      settled = true
      if (progress && progress.destroy) progress.destroy()
      if (stream.destroy) stream.destroy()
      reject(error)
    }
    const finish = () => {
      if (settled) return
      settled = true
      resolve(result)
    }

    if (options.signal) {
      if (options.signal.aborted) {
        fail(abortError())
        return
      }
      options.signal.addEventListener('abort', () => fail(abortError()))
    }
    if (options.onProgress) {
      progress = progressStream({ time: 1000, length: source.size || 0 }, data => {
        options.onProgress(data.percentage, data.eta)
      })
      stream = stream.pipe(progress)
    }

    decoder.on('error', fail)
    decoder.on('data', chunk => handleChunk(chunk, result, state))
    decoder.on('end', finish)
    stream.on('error', fail)
    stream.on('end', finish)
    stream.pipe(decoder)
  })
}

function handleChunk (chunk, result, state) {
  const event = chunk[0]
  const tag = chunk[1]
  if (!tag) return

  if (event === 'start') {
    state.stack.push(tag.name)
    if (tag.name === 'TrackEntry') state.track = {}
    if (tag.name === 'AttachedFile') state.attachment = {}
    return
  }
  if (event === 'end') {
    if (tag.name === 'TrackEntry' && state.track && state.track.number) {
      const track = state.track
      result.tracks.push(track)
      state.trackByNumber[track.number] = track
      if (track.type === TRACK_TYPES.SUBTITLE ||
        (state.collectMediaBlocks &&
          (track.type === TRACK_TYPES.VIDEO || track.type === TRACK_TYPES.AUDIO))) {
        result.blocksByTrack.set(track.number, [])
      }
      state.track = null
    }
    if (tag.name === 'AttachedFile' && state.attachment && state.attachment.data) {
      result.attachments.push(state.attachment)
      state.attachment = null
    }
    state.stack.pop()
    return
  }
  if (event !== 'tag') return

  const name = tag.name
  const value = tag.data
  if (state.track) {
    if (name === 'TrackNumber') state.track.number = numberValue(value)
    if (name === 'TrackType') state.track.type = numberValue(value)
    if (name === 'CodecID') state.track.codecId = stringValue(value)
    if (name === 'CodecPrivate') state.track.codecPrivate = value
    if (name === 'Language') state.track.language = stringValue(value)
    if (name === 'Name') state.track.name = stringValue(value)
    if (name === 'FlagDefault') state.track.default = Boolean(numberValue(value))
    if (name === 'PixelWidth') state.track.width = numberValue(value)
    if (name === 'PixelHeight') state.track.height = numberValue(value)
    if (name === 'SamplingFrequency') state.track.samplingFrequency = Number(value)
    if (name === 'Channels') state.track.channels = numberValue(value)
  }
  if (state.attachment) {
    if (name === 'FileName') state.attachment.name = stringValue(value)
    if (name === 'FileMimeType') state.attachment.mimeType = stringValue(value)
    if (name === 'FileData') state.attachment.data = value
  }
  if (name === 'Duration') result.info.duration = Number(value)
  if (name === 'Title') result.info.title = stringValue(value)
  if (name === 'TimecodeScale') state.timecodeScale = numberValue(value)
  if (name === 'Timecode') state.clusterTimecode = numberValue(value)
  if (name === 'BlockDuration' && state.lastBlock &&
    state.stack.indexOf('BlockGroup') !== -1) {
    const duration = toMilliseconds(numberValue(value), state.timecodeScale)
    state.lastBlock.duration = duration
    if (state.lastBlock.durationMs !== undefined) state.lastBlock.durationMs = duration
  }
  if (name === 'SimpleBlock' || name === 'Block') addBlock(value, result, state)
}

function addBlock (data, result, state) {
  const trackVint = readVint(data)
  const trackNumber = trackVint.value
  const track = state.trackByNumber[trackNumber]
  if (!track || !result.blocksByTrack.has(trackNumber)) return
  const bytes = new Uint8Array(data)
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const relativeTimecode = view.getInt16(trackVint.length)
  const flags = bytes[trackVint.length + 2]
  const payload = new Uint8Array(data.slice(trackVint.length + 3))
  const timestamp = toMilliseconds(state.clusterTimecode + relativeTimecode, state.timecodeScale)
  const media = track.type === TRACK_TYPES.VIDEO || track.type === TRACK_TYPES.AUDIO
  const block = {
    trackNumber,
    timecode: timestamp,
    duration: 0,
    data: media ? payload : Buffer.from(payload).toString('utf8'),
    keyframe: Boolean(flags & 0x80)
  }
  if (media) {
    block.clusterTimecodeMs = toMilliseconds(state.clusterTimecode, state.timecodeScale)
    block.blockTimestamp = timestamp
    block.durationMs = 0
  }
  state.lastBlock = block
  result.blocksByTrack.get(trackNumber).push(block)
}

function toMilliseconds (timecode, scale) {
  return timecode * scale / 1000000
}

function sourceToStream (source) {
  if (source && typeof source.pipe === 'function') return source
  if (source instanceof ArrayBuffer) return readableFromBuffer(new Uint8Array(source))
  if (typeof Blob !== 'undefined' && source instanceof Blob) {
    return fileReaderStream(source, { chunkSize: 2 * 1024 * 1024 })
  }
  if (source && typeof source.getReader === 'function') return readableFromWebStream(source)
  throw new TypeError('source must be a File, Blob, ArrayBuffer, or ReadableStream')
}

function readableFromBuffer (buffer) {
  const stream = new Readable()
  stream._read = () => {
    stream.push(Buffer.from(buffer))
    stream.push(null)
  }
  return stream
}

function readableFromWebStream (webStream) {
  const stream = new Readable({ read: () => {} })
  const reader = webStream.getReader()
  const pump = () => reader.read().then(result => {
    if (result.done) stream.push(null)
    else {
      stream.push(Buffer.from(result.value))
      pump()
    }
  }).catch(error => stream.destroy(error))
  pump()
  return stream
}

function numberValue (value) {
  return typeof value === 'number' ? value : Number(value)
}

function stringValue (value) {
  return Buffer.isBuffer(value) ? value.toString() : String(value)
}

function abortError () {
  const error = new Error('Demux aborted')
  error.name = 'AbortError'
  return error
}

export { demux }
export default demux
