var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var src_exports = {};
__export(src_exports, {
  MKVPlayer: () => MKVPlayer,
  MSEPlayer: () => MSEPlayer,
  attachSubtitleTracks: () => attachSubtitleTracks,
  createPlayer: () => createPlayer,
  demux: () => demuxer_default,
  extractAttachments: () => attachments_default,
  extractCues: () => extractCues,
  extractSubtitles: () => extract_default,
  getPlaybackSupport: () => getPlaybackSupport,
  remuxToMp4: () => remuxToMp4
});
module.exports = __toCommonJS(src_exports);

// src/core/demuxer.js
var import_filereader_stream = __toESM(require("filereader-stream"), 1);
var import_progress_stream = __toESM(require("progress-stream"), 1);
var import_stream = require("stream");

// src/core/constants.js
var TRACK_TYPES = {
  VIDEO: 1,
  AUDIO: 2,
  COMPLEX: 3,
  LOGO: 16,
  SUBTITLE: 17,
  BUTTONS: 18,
  CONTROL: 32
};
var CODEC_IDS = {
  V_MPEG4_ISO_AVC: "V_MPEG4/ISO/AVC",
  V_MPEGH_HEVC: "V_MPEGH/ISO/HEVC",
  A_AAC: "A_AAC",
  A_AC3: "A_AC3",
  A_EAC3: "A_EAC3",
  A_MPEG_L3: "A_MPEG/L3",
  A_OPUS: "A_OPUS",
  A_VORBIS: "A_VORBIS",
  S_TEXT_UTF8: "S_TEXT/UTF8",
  S_TEXT_ASCII: "S_TEXT/ASCII",
  S_TEXT_ASS: "S_TEXT/ASS",
  S_TEXT_SSA: "S_TEXT/SSA",
  S_TEXT_USF: "S_TEXT/USF",
  S_TEXT_WEBVTT: "S_TEXT/WEBVTT"
};

// src/core/ebml-reader.js
var import_ebml = __toESM(require("ebml"), 1);
function createDecoder() {
  return new import_ebml.default.Decoder();
}
function readVint(data) {
  return import_ebml.default.tools.readVint(data);
}

// src/core/demuxer.js
function demux(source, options) {
  options = options || {};
  return new Promise((resolve, reject) => {
    let stream;
    try {
      stream = sourceToStream(source);
    } catch (error) {
      reject(error);
      return;
    }
    const result = {
      info: {},
      tracks: [],
      attachments: [],
      blocksByTrack: /* @__PURE__ */ new Map()
    };
    const decoder = createDecoder();
    const state = {
      track: null,
      attachment: null,
      clusterTimecode: 0,
      trackByNumber: /* @__PURE__ */ Object.create(null),
      timecodeScale: 1e6,
      stack: [],
      lastBlock: null
    };
    state.collectMediaBlocks = Boolean(options.collectMediaBlocks);
    let progress;
    let settled = false;
    const fail = (error) => {
      if (settled) return;
      settled = true;
      if (progress && progress.destroy) progress.destroy();
      if (stream.destroy) stream.destroy();
      reject(error);
    };
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve(result);
    };
    if (options.signal) {
      if (options.signal.aborted) {
        fail(abortError());
        return;
      }
      options.signal.addEventListener("abort", () => fail(abortError()));
    }
    if (options.onProgress) {
      progress = (0, import_progress_stream.default)({ time: 1e3, length: source.size || 0 }, (data) => {
        options.onProgress(data.percentage, data.eta);
      });
      stream = stream.pipe(progress);
    }
    decoder.on("error", fail);
    decoder.on("data", (chunk) => handleChunk(chunk, result, state));
    decoder.on("end", finish);
    stream.on("error", fail);
    stream.on("end", finish);
    stream.pipe(decoder);
  });
}
function handleChunk(chunk, result, state) {
  const event = chunk[0];
  const tag = chunk[1];
  if (!tag) return;
  if (event === "start") {
    state.stack.push(tag.name);
    if (tag.name === "TrackEntry") state.track = {};
    if (tag.name === "AttachedFile") state.attachment = {};
    return;
  }
  if (event === "end") {
    if (tag.name === "TrackEntry" && state.track && state.track.number) {
      const track = state.track;
      result.tracks.push(track);
      state.trackByNumber[track.number] = track;
      if (track.type === TRACK_TYPES.SUBTITLE || state.collectMediaBlocks && (track.type === TRACK_TYPES.VIDEO || track.type === TRACK_TYPES.AUDIO)) {
        result.blocksByTrack.set(track.number, []);
      }
      state.track = null;
    }
    if (tag.name === "AttachedFile" && state.attachment && state.attachment.data) {
      result.attachments.push(state.attachment);
      state.attachment = null;
    }
    state.stack.pop();
    return;
  }
  if (event !== "tag") return;
  const name = tag.name;
  const value = tag.data;
  if (state.track) {
    if (name === "TrackNumber") state.track.number = numberValue(value);
    if (name === "TrackType") state.track.type = numberValue(value);
    if (name === "CodecID") state.track.codecId = stringValue(value);
    if (name === "CodecPrivate") state.track.codecPrivate = value;
    if (name === "Language") state.track.language = stringValue(value);
    if (name === "Name") state.track.name = stringValue(value);
    if (name === "FlagDefault") state.track.default = Boolean(numberValue(value));
    if (name === "PixelWidth") state.track.width = numberValue(value);
    if (name === "PixelHeight") state.track.height = numberValue(value);
    if (name === "SamplingFrequency") state.track.samplingFrequency = Number(value);
    if (name === "Channels") state.track.channels = numberValue(value);
  }
  if (state.attachment) {
    if (name === "FileName") state.attachment.name = stringValue(value);
    if (name === "FileMimeType") state.attachment.mimeType = stringValue(value);
    if (name === "FileData") state.attachment.data = value;
  }
  if (name === "Duration") result.info.duration = Number(value);
  if (name === "Title") result.info.title = stringValue(value);
  if (name === "TimecodeScale") state.timecodeScale = numberValue(value);
  if (name === "Timecode") state.clusterTimecode = numberValue(value);
  if (name === "BlockDuration" && state.lastBlock && state.stack.indexOf("BlockGroup") !== -1) {
    const duration = toMilliseconds(numberValue(value), state.timecodeScale);
    state.lastBlock.duration = duration;
    if (state.lastBlock.durationMs !== void 0) state.lastBlock.durationMs = duration;
  }
  if (name === "SimpleBlock" || name === "Block") addBlock(value, result, state);
}
function addBlock(data, result, state) {
  const trackVint = readVint(data);
  const trackNumber = trackVint.value;
  const track = state.trackByNumber[trackNumber];
  if (!track || !result.blocksByTrack.has(trackNumber)) return;
  const bytes2 = new Uint8Array(data);
  const view = new DataView(bytes2.buffer, bytes2.byteOffset, bytes2.byteLength);
  const relativeTimecode = view.getInt16(trackVint.length);
  const flags = bytes2[trackVint.length + 2];
  const payload = new Uint8Array(data.slice(trackVint.length + 3));
  const timestamp = toMilliseconds(state.clusterTimecode + relativeTimecode, state.timecodeScale);
  const media = track.type === TRACK_TYPES.VIDEO || track.type === TRACK_TYPES.AUDIO;
  const block = {
    trackNumber,
    timecode: timestamp,
    duration: 0,
    data: media ? payload : Buffer.from(payload).toString("utf8"),
    keyframe: Boolean(flags & 128)
  };
  if (media) {
    block.clusterTimecodeMs = toMilliseconds(state.clusterTimecode, state.timecodeScale);
    block.blockTimestamp = timestamp;
    block.durationMs = 0;
  }
  state.lastBlock = block;
  result.blocksByTrack.get(trackNumber).push(block);
}
function toMilliseconds(timecode, scale) {
  return timecode * scale / 1e6;
}
function sourceToStream(source) {
  if (source && typeof source.pipe === "function") return source;
  if (source instanceof ArrayBuffer) return readableFromBuffer(new Uint8Array(source));
  if (typeof Blob !== "undefined" && source instanceof Blob) {
    return (0, import_filereader_stream.default)(source, { chunkSize: 2 * 1024 * 1024 });
  }
  if (source && typeof source.getReader === "function") return readableFromWebStream(source);
  throw new TypeError("source must be a File, Blob, ArrayBuffer, or ReadableStream");
}
function readableFromBuffer(buffer) {
  const stream = new import_stream.Readable();
  stream._read = () => {
    stream.push(Buffer.from(buffer));
    stream.push(null);
  };
  return stream;
}
function readableFromWebStream(webStream) {
  const stream = new import_stream.Readable({ read: () => {
  } });
  const reader = webStream.getReader();
  const pump = () => reader.read().then((result) => {
    if (result.done) stream.push(null);
    else {
      stream.push(Buffer.from(result.value));
      pump();
    }
  }).catch((error) => stream.destroy(error));
  pump();
  return stream;
}
function numberValue(value) {
  return typeof value === "number" ? value : Number(value);
}
function stringValue(value) {
  return Buffer.isBuffer(value) ? value.toString() : String(value);
}
function abortError() {
  const error = new Error("Demux aborted");
  error.name = "AbortError";
  return error;
}
var demuxer_default = demux;

// src/subtitles/format.js
function formatTimestamp(timestamp) {
  const seconds = timestamp / 1e3;
  const hh = Math.floor(seconds / 3600);
  let mm = Math.floor((seconds - hh * 3600) / 60);
  let ss = (seconds - hh * 3600 - mm * 60).toFixed(2);
  if (mm < 10) mm = `0${mm}`;
  if (ss < 10) ss = `0${ss}`;
  return `${hh}:${mm}:${ss}`;
}
function formatTimestampSRT(timestamp) {
  const seconds = timestamp / 1e3;
  let hh = Math.floor(seconds / 3600);
  let mm = Math.floor((seconds - hh * 3600) / 60);
  let ss = (seconds - hh * 3600 - mm * 60).toFixed(3);
  if (hh < 10) hh = `0${hh}`;
  if (mm < 10) mm = `0${mm}`;
  if (ss < 10) ss = `0${ss}`;
  return `${hh}:${mm}:${ss}`;
}

// src/subtitles/extract.js
var DEFAULT_DURATION = 2e3;
function extractCues(result, trackNumber) {
  const track = result.tracks.find((item) => item.number === trackNumber);
  if (!track) return [];
  const blocks = getBlocks(result, trackNumber);
  const format = detectFormat(track, blocks);
  return blocks.map((block, index) => {
    const endMs = block.duration > 0 ? block.timecode + block.duration : blocks[index + 1] && blocks[index + 1].timecode > block.timecode ? blocks[index + 1].timecode : block.timecode + DEFAULT_DURATION;
    return {
      startMs: block.timecode,
      endMs,
      text: format === "ass" ? assText(block.data, track.codecPrivate) : block.data,
      format
    };
  });
}
function extractSubtitles(result) {
  return result.tracks.filter((track) => track.type === TRACK_TYPES.SUBTITLE).map((track, index) => {
    const blocks = getBlocks(result, track.number);
    const cues = extractCues(result, track.number);
    const format = cues[0] ? cues[0].format : detectFormat(track, []);
    const name = "Subtitle_" + (index + 1) + (format === "ass" ? ".ass" : ".srt");
    return { name, data: format === "ass" ? assData(track, cues, blocks) : srtData(cues) };
  });
}
function getBlocks(result, trackNumber) {
  const blocks = result.blocksByTrack instanceof Map ? result.blocksByTrack.get(trackNumber) : result.blocksByTrack && result.blocksByTrack[trackNumber];
  return (blocks || []).slice().sort((a, b) => a.timecode - b.timecode);
}
function detectFormat(track, blocks) {
  const codecId = track.codecId;
  if (codecId === CODEC_IDS.S_TEXT_ASS || codecId === CODEC_IDS.S_TEXT_SSA) return "ass";
  if (codecId === CODEC_IDS.S_TEXT_UTF8 || codecId === CODEC_IDS.S_TEXT_ASCII) return "srt";
  const privateData = bufferToString(track.codecPrivate);
  if (/\[Events\][\s\S]*^\s*Format:/im.test(privateData)) return "ass";
  return blocks.some((block) => /^\s*Dialogue\s*:/i.test(block.data) || /^\s*Format\s*:/im.test(block.data)) ? "ass" : "srt";
}
function assData(track, cues, blocks) {
  const header = bufferToString(track.codecPrivate);
  const lines = cues.map((cue, index) => assDialogue(
    cue,
    track.codecPrivate,
    blocks[index] ? blocks[index].data : cue.text
  ));
  if (!header) return lines.join("\r\n") + (lines.length ? "\r\n" : "");
  return header + (header.endsWith("\n") ? "" : "\r\n") + lines.join("\r\n") + (lines.length ? "\r\n" : "");
}
function assDialogue(cue, codecPrivate2, data) {
  const fields = data.split(",");
  const format = assFormat(codecPrivate2);
  const start = format.indexOf("start");
  const end = format.indexOf("end");
  if (start !== -1 && end !== -1) {
    fields[start] = formatTimestamp(cue.startMs);
    fields[end] = formatTimestamp(cue.endMs);
    return "Dialogue: " + fields.join(",");
  }
  return "Dialogue: " + [
    fields[0] || "0",
    formatTimestamp(cue.startMs),
    formatTimestamp(cue.endMs)
  ].concat(fields.slice(1)).join(",");
}
function assText(data, codecPrivate2) {
  const fields = data.split(",");
  const format = assFormat(codecPrivate2);
  const textIndex = format.indexOf("text");
  return textIndex === -1 ? fields[fields.length - 1] : fields.slice(textIndex).join(",");
}
function assFormat(codecPrivate2) {
  const match = bufferToString(codecPrivate2).match(/^\s*Format:\s*([^\r\n]*)/im);
  return match ? match[1].split(",").map((field) => field.trim().toLowerCase()) : [];
}
function srtData(cues) {
  return cues.map((cue, index) => index + 1 + "\r\n" + formatTimestampSRT(cue.startMs).replace(".", ",") + " --> " + formatTimestampSRT(cue.endMs).replace(".", ",") + "\r\n" + cue.text + "\r\n").join("\r\n");
}
function bufferToString(value) {
  return value == null ? "" : Buffer.from(value).toString("utf8");
}
var extract_default = extractSubtitles;

// src/extract/attachments.js
function extractAttachments(result) {
  return result.attachments.map((attachment) => ({
    name: attachment.name,
    data: attachment.data
  }));
}
var attachments_default = extractAttachments;

// src/playback/codecs.js
function isWebSafeVideo(codecId) {
  return codecId === CODEC_IDS.V_MPEG4_ISO_AVC || codecId === "V_AV1";
}
function isWebSafeAudio(codecId) {
  return codecId === CODEC_IDS.A_AAC || codecId === CODEC_IDS.A_MPEG_L3;
}
function getPlaybackSupport(tracks) {
  const videoTrack = tracks.find((track) => track.type === TRACK_TYPES.VIDEO);
  const audioTrack = tracks.find((track) => track.type === TRACK_TYPES.AUDIO);
  const reasons = [];
  if (!videoTrack && !audioTrack) reasons.push("No video or audio tracks found");
  if (videoTrack && !isWebSafeVideo(videoTrack.codecId)) {
    reasons.push(`Unsupported video codec: ${videoTrack.codecId || "unknown"}`);
  }
  if (audioTrack && !isWebSafeAudio(audioTrack.codecId)) {
    reasons.push(`Unsupported audio codec: ${audioTrack.codecId || "unknown"}`);
  }
  return {
    supported: reasons.length === 0 && Boolean(videoTrack || audioTrack),
    videoTrack,
    audioTrack,
    ...reasons.length ? { reason: reasons.join("; ") } : {}
  };
}

// src/playback/remux.js
var encoder = new TextEncoder();
function bytes(...parts) {
  const length = parts.reduce((total, part) => total + part.length, 0);
  const output = new Uint8Array(length);
  let offset = 0;
  parts.forEach((part) => {
    output.set(part, offset);
    offset += part.length;
  });
  return output;
}
function u32(value) {
  const output = new Uint8Array(4);
  new DataView(output.buffer).setUint32(0, value >>> 0);
  return output;
}
function i32(value) {
  const output = new Uint8Array(4);
  new DataView(output.buffer).setInt32(0, value);
  return output;
}
function u16(value) {
  const output = new Uint8Array(2);
  new DataView(output.buffer).setUint16(0, value);
  return output;
}
function box(type, ...contents) {
  const body = bytes(...contents);
  return bytes(u32(body.length + 8), encoder.encode(type), body);
}
function fullBox(type, version, flags, ...contents) {
  return box(type, bytes(new Uint8Array([version]), new Uint8Array([
    flags >>> 16 & 255,
    flags >>> 8 & 255,
    flags & 255
  ]), ...contents));
}
function codecPrivate(track) {
  return track.codecPrivate instanceof Uint8Array ? track.codecPrivate : track.codecPrivate ? new Uint8Array(track.codecPrivate) : new Uint8Array(0);
}
function avcConfig(track) {
  const privateData = codecPrivate(track);
  if (privateData.length >= 7 && privateData[0] === 1) return privateData;
  const sps = findNal(privateData, 7);
  const pps = findNal(privateData, 8);
  if (!sps || !pps) {
    return new Uint8Array([1, 66, 0, 30, 255, 225, 0, 0, 1, 0, 0, 0, 1, 0]);
  }
  return bytes(
    new Uint8Array([1, sps[1] || 66, sps[2] || 0, sps[3] || 30, 255, 225]),
    u16(sps.length),
    sps,
    new Uint8Array([1]),
    u16(pps.length),
    pps
  );
}
function findNal(data, type) {
  let start = 0;
  while (start + 4 < data.length) {
    if (data[start] === 0 && data[start + 1] === 0 && (data[start + 2] === 1 || data[start + 2] === 0 && data[start + 3] === 1)) {
      const header = data[start + 2] === 1 ? start + 3 : start + 4;
      const end = nextStart(data, header);
      if ((data[header] & 31) === type) return data.slice(header, end);
      start = end;
    } else start++;
  }
  return null;
}
function nextStart(data, start) {
  for (let i = start; i + 3 < data.length; i++) {
    if (data[i] === 0 && data[i + 1] === 0 && (data[i + 2] === 1 || data[i + 2] === 0 && data[i + 3] === 1)) return i;
  }
  return data.length;
}
function h264Sample(data) {
  const input = data instanceof Uint8Array ? data : new Uint8Array(data);
  const output = [];
  let offset = 0;
  while (offset + 4 <= input.length) {
    const length = new DataView(input.buffer, input.byteOffset + offset, 4).getUint32(0);
    if (length === 0 || offset + 4 + length > input.length) break;
    output.push(input.slice(offset, offset + 4 + length));
    offset += 4 + length;
  }
  if (output.length && offset === input.length) return bytes(...output);
  const nals = [];
  let start = 0;
  while (start < input.length) {
    const marker = startCode(input, start);
    if (marker < 0) break;
    const nalStart = marker + (input[marker + 2] === 1 ? 3 : 4);
    const nalEnd = nextStart(input, nalStart);
    if (nalEnd > nalStart) nals.push(bytes(u32(nalEnd - nalStart), input.slice(nalStart, nalEnd)));
    start = nalEnd;
  }
  return nals.length ? bytes(...nals) : input;
}
function startCode(data, from) {
  for (let i = from; i + 3 < data.length; i++) {
    if (data[i] === 0 && data[i + 1] === 0 && (data[i + 2] === 1 || data[i + 2] === 0 && data[i + 3] === 1)) return i;
  }
  return -1;
}
function audioSample(data, track) {
  const input = data instanceof Uint8Array ? data : new Uint8Array(data);
  if (track.codecId === CODEC_IDS.A_AAC && input.length > 7 && input[0] === 255 && (input[1] & 240) === 240) {
    const protection = input[1] & 1;
    const length = (input[3] & 3) << 11 | input[4] << 3 | input[5] >> 5;
    return input.slice(7 + (protection ? 0 : 2), length);
  }
  return input;
}
function visualSampleEntry(track) {
  const width = track.width || 1920;
  const height = track.height || 1080;
  const compressor = new Uint8Array(32);
  const config = box("avcC", avcConfig(track));
  const data = bytes(
    new Uint8Array(6),
    u16(1),
    new Uint8Array(16),
    u16(width),
    u16(height),
    u32(4718592),
    u32(4718592),
    new Uint8Array(4),
    new Uint8Array([0, 0]),
    compressor,
    u16(24),
    u16(65535),
    config
  );
  return box("avc1", data);
}
function audioSampleEntry(track) {
  const config = codecPrivate(track);
  const esds = fullBox("esds", 0, 0, bytes(
    new Uint8Array([
      3,
      25,
      0,
      0,
      0,
      4,
      17,
      64,
      21,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      5,
      config.length
    ]),
    config,
    new Uint8Array([6, 1, 2])
  ));
  const rate = track.samplingFrequency || 48e3;
  return box("mp4a", bytes(
    new Uint8Array(6),
    u16(1),
    new Uint8Array(8),
    u16(track.channels || 2),
    u16(16),
    u16(0),
    u16(0),
    u32(rate << 16),
    esds
  ));
}
function trackBox(track, id) {
  const video = track.type === TRACK_TYPES.VIDEO;
  const handler = video ? "vide" : "soun";
  const sampleEntry = video ? visualSampleEntry(track) : audioSampleEntry(track);
  const stbl = box(
    "stbl",
    box("stsd", bytes(new Uint8Array([0, 0, 0, 0]), u32(1), sampleEntry)),
    box("stts", new Uint8Array(8)),
    box("stsc", new Uint8Array(8)),
    box("stsz", new Uint8Array(12)),
    box("stco", new Uint8Array(8))
  );
  const minf = box(
    "minf",
    video ? box("vmhd", new Uint8Array(8)) : box("smhd", new Uint8Array(4)),
    box("dinf", box("dref", bytes(new Uint8Array(4), u32(1), box("url ", new Uint8Array([0, 0, 0, 1]))))),
    stbl
  );
  const tkhd = fullBox(
    "tkhd",
    0,
    7,
    new Uint8Array(16),
    u32(id),
    new Uint8Array(8),
    u16(0),
    new Uint8Array(2),
    new Uint8Array(8),
    u32(65536),
    new Uint8Array(8),
    u32(video ? (track.width || 1920) << 16 : 0),
    u32(video ? (track.height || 1080) << 16 : 0)
  );
  const mdhd = fullBox("mdhd", 0, 0, new Uint8Array(8), u32(1e3), u32(0), u16(21956), u16(0));
  const hdlr = fullBox(
    "hdlr",
    0,
    0,
    new Uint8Array(4),
    encoder.encode(handler),
    new Uint8Array(12),
    encoder.encode(video ? "VideoHandler\0" : "SoundHandler\0")
  );
  return box("trak", tkhd, box("mdia", mdhd, hdlr, minf));
}
async function createInitSegment(tracks) {
  const selected = tracks.filter((track) => track.type === TRACK_TYPES.VIDEO || track.type === TRACK_TYPES.AUDIO);
  const mvhd = fullBox(
    "mvhd",
    0,
    0,
    new Uint8Array(8),
    u32(1e3),
    u32(0),
    u32(65536),
    u16(256),
    new Uint8Array(10),
    new Uint8Array([
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2
    ])
  );
  const trex = selected.map((track, index) => fullBox(
    "trex",
    0,
    0,
    u32(index + 1),
    u32(1),
    u32(0),
    u32(0),
    u32(0),
    u32(0)
  ));
  return bytes(box("ftyp", bytes(
    encoder.encode("isom"),
    new Uint8Array([0, 0, 2, 0]),
    encoder.encode("isomiso6avc1mp41")
  )), box(
    "moov",
    mvhd,
    ...selected.map((track, index) => trackBox(track, index + 1)),
    box("mvex", ...trex)
  ));
}
async function createMediaSegment(blocks, sequenceNumber = 1) {
  const grouped = /* @__PURE__ */ new Map();
  blocks.forEach((block) => {
    if (!grouped.has(block.trackNumber)) grouped.set(block.trackNumber, []);
    grouped.get(block.trackNumber).push(block);
  });
  const samples = [];
  grouped.forEach((trackBlocks, trackNumber) => {
    trackBlocks.forEach((block, index) => {
      const data = block.trackType === TRACK_TYPES.AUDIO ? audioSample(block.data, block.track) : h264Sample(block.data);
      samples.push({ trackNumber, block, data, duration: Math.max(1, Math.round(block.durationMs || block.duration || 33)), index });
    });
  });
  samples.sort((a, b) => (a.block.blockTimestamp || a.block.timecode || 0) - (b.block.blockTimestamp || b.block.timecode || 0));
  const trackSamplesByNumber = /* @__PURE__ */ new Map();
  grouped.forEach((trackBlocks, trackNumber) => {
    trackSamplesByNumber.set(trackNumber, samples.filter((sample) => sample.trackNumber === trackNumber));
  });
  const payload = bytes(...Array.from(trackSamplesByNumber.values()).flat().map((sample) => sample.data));
  function makeMoof(dataOffset) {
    const trafs = [];
    grouped.forEach((trackBlocks, trackNumber) => {
      const trackSamples = trackSamplesByNumber.get(trackNumber);
      const entries = trackSamples.map((sample) => bytes(
        u32(sample.duration),
        u32(sample.data.length),
        u32(sample.block.keyframe ? 33554432 : 16842752)
      ));
      const trun = fullBox("trun", 0, 1793, u32(trackSamples.length), i32(dataOffset), ...entries);
      const tfhd = fullBox("tfhd", 0, 131072, u32(trackNumber));
      const timestamp = Math.round(trackBlocks[0].blockTimestamp || trackBlocks[0].timecode || 0);
      const tfdt = fullBox("tfdt", 0, 0, u32(Math.max(0, timestamp)));
      trafs.push(box("traf", tfhd, tfdt, trun));
    });
    return box("moof", fullBox("mfhd", 0, 0, u32(sequenceNumber)), ...trafs);
  }
  let moof = makeMoof(0);
  moof = makeMoof(moof.length + 8);
  return bytes(moof, box("mdat", payload));
}
async function remuxToMp4(demuxResult, options = {}) {
  const support = getPlaybackSupport(demuxResult.tracks);
  if (!support.supported) throw new Error(support.reason);
  const tracks = [support.videoTrack, support.audioTrack].filter(Boolean);
  const blocks = [];
  tracks.forEach((track) => {
    ;
    (demuxResult.blocksByTrack.get(track.number) || []).forEach((block) => {
      blocks.push({ ...block, trackType: track.type, track });
    });
  });
  const init = await createInitSegment(tracks);
  const media = await createMediaSegment(blocks, options.sequenceNumber || 1);
  return { blob: new Blob([init, media], { type: "video/mp4" }), mimeType: "video/mp4" };
}

// src/playback/mse-player.js
var MSEPlayer = class {
  constructor(videoElement, options = {}) {
    if (!videoElement) throw new TypeError("MSEPlayer requires a video element");
    this.video = videoElement;
    this.options = options;
    this.handlers = /* @__PURE__ */ new Map();
    this.source = null;
    this.buffer = null;
    this.queue = [];
    this.objectUrl = null;
  }
  on(event, handler) {
    if (!this.handlers.has(event)) this.handlers.set(event, []);
    this.handlers.get(event).push(handler);
    return () => this.handlers.get(event).splice(this.handlers.get(event).indexOf(handler), 1);
  }
  emit(event, value) {
    ;
    (this.handlers.get(event) || []).forEach((handler) => handler(value));
  }
  async load(demuxResult) {
    const support = getPlaybackSupport(demuxResult.tracks);
    if (!support.supported) throw new Error(support.reason);
    if (typeof MediaSource === "undefined") throw new Error("MediaSource is not supported");
    const result = await remuxToMp4(demuxResult, this.options);
    const source = new MediaSource();
    this.source = source;
    this.objectUrl = URL.createObjectURL(source);
    this.video.src = this.objectUrl;
    await new Promise((resolve, reject) => {
      source.addEventListener("sourceopen", () => {
        try {
          const codecs = [];
          if (support.videoTrack) codecs.push(codecString(support.videoTrack));
          if (support.audioTrack) codecs.push(codecString(support.audioTrack));
          this.buffer = source.addSourceBuffer(`video/mp4; codecs="${codecs.join(", ")}"`);
          this.buffer.addEventListener("updateend", () => this.flush(resolve));
          this.queue.push(awaitBuffer(result.blob));
          this.flush(resolve);
        } catch (error) {
          reject(error);
        }
      }, { once: true });
      source.addEventListener("error", () => reject(new Error("MediaSource error")), { once: true });
    });
    this.emit("ready");
    return this;
  }
  flush(resolve) {
    if (!this.buffer || this.buffer.updating || !this.queue.length) return;
    const next = this.queue.shift();
    if (next && typeof next.then === "function") {
      next.then((data) => {
        this.buffer.appendBuffer(data);
        if (resolve) resolve();
      });
    } else {
      this.buffer.appendBuffer(next);
      if (resolve) resolve();
    }
    this.emit("progress");
  }
  destroy() {
    if (this.buffer) {
      this.buffer.removeEventListener("updateend", this.flush);
      if (this.source && this.source.readyState === "open") this.source.endOfStream();
    }
    if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
    this.video.removeAttribute("src");
    this.video.load();
    this.queue = [];
    this.buffer = null;
    this.source = null;
  }
};
function awaitBuffer(blob) {
  return blob.arrayBuffer().then((buffer) => new Uint8Array(buffer));
}
function codecString(track) {
  if (track.type === 1) {
    const data = track.codecPrivate instanceof Uint8Array ? track.codecPrivate : new Uint8Array(track.codecPrivate || []);
    if (data[0] === 1 && data.length >= 4) {
      return `avc1.${Array.from(data.slice(1, 4)).map((byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
    }
    return "avc1.42E01E";
  }
  const config = track.codecPrivate instanceof Uint8Array ? track.codecPrivate : new Uint8Array(track.codecPrivate || []);
  const objectType = config.length ? config[0] >> 3 : 2;
  return `mp4a.40.${objectType}`;
}

// src/playback/subtitles.js
var import_srt2vtt = require("srt2vtt");
function cueTimestamp(milliseconds) {
  const total = Math.max(0, milliseconds || 0);
  const hours = Math.floor(total / 36e5);
  const minutes = Math.floor(total % 36e5 / 6e4);
  const seconds = Math.floor(total % 6e4 / 1e3);
  const millis = Math.floor(total % 1e3);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(millis).padStart(3, "0")}`;
}
function stripAssTags(text) {
  return String(text || "").replace(/\{[^}]*\}/g, "").replace(/\\N/g, "\n").replace(/\\n/g, "\n").replace(/\\h/g, " ");
}
function cuesToSrt(cues) {
  return cues.map((cue, index) => `${index + 1}
${cueTimestamp(cue.startMs).replace(".", ",")} --> ${cueTimestamp(cue.endMs).replace(".", ",")}
${cue.text || ""}`).join("\n\n");
}
function cuesToVtt(cues, format) {
  if (format === "ass") {
    return `WEBVTT

${cues.map((cue) => `${cueTimestamp(cue.startMs)} --> ${cueTimestamp(cue.endMs)}
${stripAssTags(cue.text)}`).join("\n\n")}

`;
  }
  return (0, import_srt2vtt.convert)(cuesToSrt(cues));
}
async function attachSubtitleTracks(videoElement, demuxResult, options = {}) {
  if (!videoElement || typeof videoElement.appendChild !== "function") {
    throw new TypeError("attachSubtitleTracks requires a video element");
  }
  const doc = options.document || videoElement.ownerDocument || (typeof document !== "undefined" ? document : null);
  if (!doc || typeof doc.createElement !== "function") {
    throw new Error("attachSubtitleTracks requires a document");
  }
  const subtitleTracks = (demuxResult.tracks || []).filter((track) => track.type === TRACK_TYPES.SUBTITLE);
  const entries = [];
  const blobUrls = [];
  subtitleTracks.forEach((track, index) => {
    const cues = extractCues(demuxResult, track.number);
    const format = cues[0] ? cues[0].format : "srt";
    const vtt = cuesToVtt(cues, format);
    const blobUrl = URL.createObjectURL(new Blob([vtt], { type: "text/vtt" }));
    const element = doc.createElement("track");
    element.kind = "subtitles";
    element.srclang = track.language || options.defaultLanguage || "und";
    element.label = track.name || track.language || `Subtitle ${index + 1}`;
    element.src = blobUrl;
    element.default = Boolean(track.default);
    videoElement.appendChild(element);
    blobUrls.push(blobUrl);
    entries.push({ track, element, format, cues, src: blobUrl });
  });
  return {
    tracks: entries,
    revokeAll() {
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  };
}

// src/playback/player.js
var MKVPlayer = class {
  constructor(videoElement, options = {}) {
    if (!videoElement) throw new TypeError("MKVPlayer requires a video element");
    this.video = videoElement;
    this.options = options;
    this.mse = null;
    this.fallbackUrl = null;
    this.subtitleHandle = null;
    this.result = null;
    this.support = null;
  }
  async load(source, loadOptions = {}) {
    this.destroy();
    const options = { ...this.options, ...loadOptions };
    const result = await demuxer_default(source, {
      collectMediaBlocks: true,
      signal: options.signal,
      onProgress: options.onProgress
    });
    const support = getPlaybackSupport(result.tracks);
    if (!support.supported) throw new Error(support.reason);
    this.result = result;
    this.support = support;
    try {
      this.mse = new MSEPlayer(this.video, options);
      await this.mse.load(result);
    } catch (error) {
      if (this.mse) this.mse.destroy();
      this.mse = null;
      const remuxed = await remuxToMp4(result, options);
      this.fallbackUrl = URL.createObjectURL(remuxed.blob);
      this.video.src = this.fallbackUrl;
    }
    this.subtitleHandle = await attachSubtitleTracks(this.video, result, options);
    if (typeof options.onProgress === "function") options.onProgress(100, 0);
    return this;
  }
  destroy() {
    if (this.mse) this.mse.destroy();
    if (this.subtitleHandle) this.subtitleHandle.revokeAll();
    if (this.video && this.video.querySelectorAll) {
      this.video.querySelectorAll("track").forEach((track) => track.remove());
    }
    if (this.fallbackUrl) {
      URL.revokeObjectURL(this.fallbackUrl);
      this.video.removeAttribute("src");
      this.video.load();
    }
    this.mse = null;
    this.subtitleHandle = null;
    this.fallbackUrl = null;
    this.result = null;
    this.support = null;
  }
  getTracks() {
    if (!this.result) return { video: [], audio: [], subtitles: [] };
    return {
      video: this.result.tracks.filter((track) => track.type === TRACK_TYPES.VIDEO),
      audio: this.result.tracks.filter((track) => track.type === TRACK_TYPES.AUDIO),
      subtitles: this.result.tracks.filter((track) => track.type === TRACK_TYPES.SUBTITLE)
    };
  }
  async downloadMp4() {
    if (!this.result) throw new Error("No media has been loaded");
    const { blob } = await remuxToMp4(this.result, this.options);
    const filename = this.options.filename || "video.mp4";
    if (typeof this.options.saveAs === "function") {
      this.options.saveAs(blob, filename);
      return blob;
    }
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = filename;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(anchor.href), 0);
    return blob;
  }
};
function createPlayer(videoElement, options) {
  return new MKVPlayer(videoElement, options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MKVPlayer,
  MSEPlayer,
  attachSubtitleTracks,
  createPlayer,
  demux,
  extractAttachments,
  extractCues,
  extractSubtitles,
  getPlaybackSupport,
  remuxToMp4
});
