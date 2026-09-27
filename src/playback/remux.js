/* global Blob */
import { CODEC_IDS, TRACK_TYPES } from '../core/constants.js'
import { getPlaybackSupport } from './codecs.js'

const encoder = new TextEncoder()

function bytes (...parts) {
  const length = parts.reduce((total, part) => total + part.length, 0)
  const output = new Uint8Array(length)
  let offset = 0
  parts.forEach(part => {
    output.set(part, offset)
    offset += part.length
  })
  return output
}

function u32 (value) {
  const output = new Uint8Array(4)
  new DataView(output.buffer).setUint32(0, value >>> 0)
  return output
}

function i32 (value) {
  const output = new Uint8Array(4)
  new DataView(output.buffer).setInt32(0, value)
  return output
}

function u16 (value) {
  const output = new Uint8Array(2)
  new DataView(output.buffer).setUint16(0, value)
  return output
}

function box (type, ...contents) {
  const body = bytes(...contents)
  return bytes(u32(body.length + 8), encoder.encode(type), body)
}

function fullBox (type, version, flags, ...contents) {
  return box(type, bytes(new Uint8Array([version]), new Uint8Array([
    (flags >>> 16) & 255, (flags >>> 8) & 255, flags & 255
  ]), ...contents))
}

function codecPrivate (track) {
  return track.codecPrivate instanceof Uint8Array
    ? track.codecPrivate
    : track.codecPrivate ? new Uint8Array(track.codecPrivate) : new Uint8Array(0)
}

function avcConfig (track) {
  const privateData = codecPrivate(track)
  if (privateData.length >= 7 && privateData[0] === 1) return privateData
  const sps = findNal(privateData, 7)
  const pps = findNal(privateData, 8)
  if (!sps || !pps) {
    return new Uint8Array([1, 0x42, 0, 0x1e, 0xff, 0xe1, 0, 0, 1, 0, 0, 0, 1, 0])
  }
  return bytes(new Uint8Array([1, sps[1] || 0x42, sps[2] || 0, sps[3] || 0x1e, 0xff, 0xe1]),
    u16(sps.length), sps, new Uint8Array([1]), u16(pps.length), pps)
}

function findNal (data, type) {
  let start = 0
  while (start + 4 < data.length) {
    if (data[start] === 0 && data[start + 1] === 0 &&
      (data[start + 2] === 1 || (data[start + 2] === 0 && data[start + 3] === 1))) {
      const header = data[start + 2] === 1 ? start + 3 : start + 4
      const end = nextStart(data, header)
      if ((data[header] & 0x1f) === type) return data.slice(header, end)
      start = end
    } else start++
  }
  return null
}

function nextStart (data, start) {
  for (let i = start; i + 3 < data.length; i++) {
    if (data[i] === 0 && data[i + 1] === 0 &&
      (data[i + 2] === 1 || (data[i + 2] === 0 && data[i + 3] === 1))) return i
  }
  return data.length
}

function h264Sample (data) {
  const input = data instanceof Uint8Array ? data : new Uint8Array(data)
  const output = []
  let offset = 0
  while (offset + 4 <= input.length) {
    const length = new DataView(input.buffer, input.byteOffset + offset, 4).getUint32(0)
    if (length === 0 || offset + 4 + length > input.length) break
    output.push(input.slice(offset, offset + 4 + length))
    offset += 4 + length
  }
  if (output.length && offset === input.length) return bytes(...output)
  const nals = []
  let start = 0
  while (start < input.length) {
    const marker = startCode(input, start)
    if (marker < 0) break
    const nalStart = marker + (input[marker + 2] === 1 ? 3 : 4)
    const nalEnd = nextStart(input, nalStart)
    if (nalEnd > nalStart) nals.push(bytes(u32(nalEnd - nalStart), input.slice(nalStart, nalEnd)))
    start = nalEnd
  }
  return nals.length ? bytes(...nals) : input
}

function startCode (data, from) {
  for (let i = from; i + 3 < data.length; i++) {
    if (data[i] === 0 && data[i + 1] === 0 &&
      (data[i + 2] === 1 || (data[i + 2] === 0 && data[i + 3] === 1))) return i
  }
  return -1
}

function audioSample (data, track) {
  const input = data instanceof Uint8Array ? data : new Uint8Array(data)
  if (track.codecId === CODEC_IDS.A_AAC && input.length > 7 &&
    input[0] === 0xff && (input[1] & 0xf0) === 0xf0) {
    const protection = input[1] & 1
    const length = ((input[3] & 3) << 11) | (input[4] << 3) | (input[5] >> 5)
    return input.slice(7 + (protection ? 0 : 2), length)
  }
  return input
}

function visualSampleEntry (track) {
  const width = track.width || 1920
  const height = track.height || 1080
  const compressor = new Uint8Array(32)
  const config = box('avcC', avcConfig(track))
  const data = bytes(new Uint8Array(6), u16(1), new Uint8Array(16), u16(width), u16(height),
    u32(0x00480000), u32(0x00480000), new Uint8Array(4), new Uint8Array([0, 0]),
    compressor, u16(0x0018), u16(0xffff), config)
  return box('avc1', data)
}

function audioSampleEntry (track) {
  const config = codecPrivate(track)
  const esds = fullBox('esds', 0, 0, bytes(
    new Uint8Array([0x03, 0x19, 0, 0, 0, 0x04, 0x11, 0x40, 0x15, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0x05, config.length]), config, new Uint8Array([0x06, 1, 2])
  ))
  const rate = track.samplingFrequency || 48000
  return box('mp4a', bytes(new Uint8Array(6), u16(1), new Uint8Array(8), u16(track.channels || 2),
    u16(16), u16(0), u16(0), u32(rate << 16), esds))
}

function trackBox (track, id) {
  const video = track.type === TRACK_TYPES.VIDEO
  const handler = video ? 'vide' : 'soun'
  const sampleEntry = video ? visualSampleEntry(track) : audioSampleEntry(track)
  const stbl = box('stbl', box('stsd', bytes(new Uint8Array([0, 0, 0, 0]), u32(1), sampleEntry)),
    box('stts', new Uint8Array(8)), box('stsc', new Uint8Array(8)),
    box('stsz', new Uint8Array(12)), box('stco', new Uint8Array(8)))
  const minf = box('minf', video ? box('vmhd', new Uint8Array(8)) : box('smhd', new Uint8Array(4)),
    box('dinf', box('dref', bytes(new Uint8Array(4), u32(1), box('url ', new Uint8Array([0, 0, 0, 1]))))), stbl)
  const tkhd = fullBox('tkhd', 0, 7, new Uint8Array(16), u32(id), new Uint8Array(8),
    u16(0), new Uint8Array(2), new Uint8Array(8), u32(0x00010000), new Uint8Array(8),
    u32(video ? (track.width || 1920) << 16 : 0), u32(video ? (track.height || 1080) << 16 : 0))
  const mdhd = fullBox('mdhd', 0, 0, new Uint8Array(8), u32(1000), u32(0), u16(0x55c4), u16(0))
  const hdlr = fullBox('hdlr', 0, 0, new Uint8Array(4), encoder.encode(handler),
    new Uint8Array(12), encoder.encode(video ? 'VideoHandler\0' : 'SoundHandler\0'))
  return box('trak', tkhd, box('mdia', mdhd, hdlr, minf))
}

async function createInitSegment (tracks) {
  const selected = tracks.filter(track => track.type === TRACK_TYPES.VIDEO || track.type === TRACK_TYPES.AUDIO)
  const mvhd = fullBox('mvhd', 0, 0, new Uint8Array(8), u32(1000), u32(0),
    u32(0x00010000), u16(0x0100), new Uint8Array(10), new Uint8Array([
      0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2
    ]))
  const trex = selected.map((track, index) => fullBox('trex', 0, 0, u32(index + 1),
    u32(1), u32(0), u32(0), u32(0), u32(0)))
  return bytes(box('ftyp', bytes(encoder.encode('isom'), new Uint8Array([0, 0, 2, 0]),
    encoder.encode('isomiso6avc1mp41'))), box('moov', mvhd,
    ...selected.map((track, index) => trackBox(track, index + 1)), box('mvex', ...trex)))
}

async function createMediaSegment (blocks, sequenceNumber = 1) {
  const grouped = new Map()
  blocks.forEach(block => {
    if (!grouped.has(block.trackNumber)) grouped.set(block.trackNumber, [])
    grouped.get(block.trackNumber).push(block)
  })
  const samples = []
  grouped.forEach((trackBlocks, trackNumber) => {
    trackBlocks.forEach((block, index) => {
      const data = block.trackType === TRACK_TYPES.AUDIO ? audioSample(block.data, block.track) : h264Sample(block.data)
      samples.push({ trackNumber, block, data, duration: Math.max(1, Math.round(block.durationMs || block.duration || 33)), index })
    })
  })
  samples.sort((a, b) => (a.block.blockTimestamp || a.block.timecode || 0) -
    (b.block.blockTimestamp || b.block.timecode || 0))
  const trackSamplesByNumber = new Map()
  grouped.forEach((trackBlocks, trackNumber) => {
    trackSamplesByNumber.set(trackNumber, samples.filter(sample => sample.trackNumber === trackNumber))
  })
  const payload = bytes(...Array.from(trackSamplesByNumber.values()).flat().map(sample => sample.data))

  function makeMoof (dataOffset) {
    const trafs = []
    grouped.forEach((trackBlocks, trackNumber) => {
      const trackSamples = trackSamplesByNumber.get(trackNumber)
      const entries = trackSamples.map(sample => bytes(u32(sample.duration), u32(sample.data.length),
        u32(sample.block.keyframe ? 0x02000000 : 0x01010000)))
      const trun = fullBox('trun', 0, 0x701, u32(trackSamples.length), i32(dataOffset), ...entries)
      const tfhd = fullBox('tfhd', 0, 0x20000, u32(trackNumber))
      const timestamp = Math.round((trackBlocks[0].blockTimestamp || trackBlocks[0].timecode || 0))
      const tfdt = fullBox('tfdt', 0, 0, u32(Math.max(0, timestamp)))
      trafs.push(box('traf', tfhd, tfdt, trun))
    })
    return box('moof', fullBox('mfhd', 0, 0, u32(sequenceNumber)), ...trafs)
  }

  let moof = makeMoof(0)
  moof = makeMoof(moof.length + 8)
  return bytes(moof, box('mdat', payload))
}

async function remuxToMp4 (demuxResult, options = {}) {
  const support = getPlaybackSupport(demuxResult.tracks)
  if (!support.supported) throw new Error(support.reason)
  const tracks = [support.videoTrack, support.audioTrack].filter(Boolean)
  const blocks = []
  tracks.forEach(track => {
    ;(demuxResult.blocksByTrack.get(track.number) || []).forEach(block => {
      blocks.push({ ...block, trackType: track.type, track })
    })
  })
  const init = await createInitSegment(tracks)
  const media = await createMediaSegment(blocks, options.sequenceNumber || 1)
  return { blob: new Blob([init, media], { type: 'video/mp4' }), mimeType: 'video/mp4' }
}

export { remuxToMp4, createInitSegment, createMediaSegment }
