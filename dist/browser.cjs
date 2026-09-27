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

// src/browser/index.js
var browser_exports = {};
__export(browser_exports, {
  MKVPlayer: () => MKVPlayer,
  MSEPlayer: () => MSEPlayer,
  OverlayManager: () => OverlayManager,
  attachSubtitleTracks: () => attachSubtitleTracks,
  createExtractorUI: () => createExtractorUI,
  createPlayer: () => createPlayer,
  createWorkerClient: () => createWorkerClient,
  demux: () => demuxer_default,
  extractAttachments: () => attachments_default,
  extractCues: () => extractCues,
  extractSubtitles: () => extract_default,
  getPlaybackSupport: () => getPlaybackSupport,
  hevcCodecString: () => hevcCodecString,
  isHevcMseSupported: () => isHevcMseSupported,
  loadFfmpeg: () => loadFfmpeg,
  registerMKVPlayerElement: () => registerMKVPlayerElement,
  remuxToMp4: () => remuxToMp4,
  resolvePlaybackStrategy: () => resolvePlaybackStrategy,
  transcodeToMp4: () => transcodeToMp4
});
module.exports = __toCommonJS(browser_exports);

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
  S_TEXT_WEBVTT: "S_TEXT/WEBVTT",
  S_HDMV_PGS: "S_HDMV/PGS",
  S_VOBSUB: "S_VOBSUB"
};
function isBitmapSubtitleCodec(codecId) {
  return codecId === CODEC_IDS.S_HDMV_PGS || codecId === CODEC_IDS.S_VOBSUB;
}

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
  const bytes3 = new Uint8Array(data);
  const view = new DataView(bytes3.buffer, bytes3.byteOffset, bytes3.byteLength);
  const relativeTimecode = view.getInt16(trackVint.length);
  const flags = bytes3[trackVint.length + 2];
  const payload = new Uint8Array(data.slice(trackVint.length + 3));
  const timestamp = toMilliseconds(state.clusterTimecode + relativeTimecode, state.timecodeScale);
  const media = track.type === TRACK_TYPES.VIDEO || track.type === TRACK_TYPES.AUDIO;
  const binarySubtitle = track.type === TRACK_TYPES.SUBTITLE && isBitmapSubtitleCodec(track.codecId);
  const block = {
    trackNumber,
    timecode: timestamp,
    duration: 0,
    data: media || binarySubtitle ? payload : Buffer.from(payload).toString("utf8"),
    keyframe: Boolean(flags & 128)
  };
  if (binarySubtitle) block.isBinary = true;
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
function formatDuration(duration) {
  duration = Math.round(duration);
  if (duration < 2) return "few seconds";
  if (duration < 58) return duration + " seconds";
  if (duration < 120) return "1 minute";
  if (duration < 3598) return Math.floor(duration / 60) + " minutes";
  if (duration < 7200) return "2 hours";
  return Math.floor(duration / 3600) + " hours";
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
    if (block.isBinary || format === "pgs" || format === "vobsub") {
      return { startMs: block.timecode, endMs, data: block.data, format };
    }
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
    const extension = format === "ass" ? ".ass" : format === "pgs" ? ".sup" : format === "vobsub" ? ".sub" : ".srt";
    const data = format === "pgs" || format === "vobsub" ? cues.map((cue) => cue.data) : format === "ass" ? assData(track, cues, blocks) : srtData(cues);
    const name = "Subtitle_" + (index + 1) + extension;
    return { name, data };
  });
}
function getBlocks(result, trackNumber) {
  const blocks = result.blocksByTrack instanceof Map ? result.blocksByTrack.get(trackNumber) : result.blocksByTrack && result.blocksByTrack[trackNumber];
  return (blocks || []).slice().sort((a, b) => a.timecode - b.timecode);
}
function detectFormat(track, blocks) {
  const codecId = track.codecId;
  if (codecId === CODEC_IDS.S_HDMV_PGS) return "pgs";
  if (codecId === CODEC_IDS.S_VOBSUB) return "vobsub";
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
function assDialogue(cue, codecPrivate3, data) {
  const fields = data.split(",");
  const format = assFormat(codecPrivate3);
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
function assText(data, codecPrivate3) {
  const fields = data.split(",");
  const format = assFormat(codecPrivate3);
  const textIndex = format.indexOf("text");
  return textIndex === -1 ? fields[fields.length - 1] : fields.slice(textIndex).join(",");
}
function assFormat(codecPrivate3) {
  const match = bufferToString(codecPrivate3).match(/^\s*Format:\s*([^\r\n]*)/im);
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

// src/playback/hevc/hevc-codec.js
function hevcCodecString(codecPrivate3) {
  const data = codecPrivate3 instanceof Uint8Array ? codecPrivate3 : new Uint8Array(codecPrivate3 || []);
  if (data.length < 13 || data[0] !== 1) return "hvc1.1.6.L93.B0";
  const profileSpace = ["", "A", "B", "C"][data[1] >> 6 & 3];
  const profile = data[1] & 31;
  const compatibility = (data[2] << 24 | data[3] << 16 | data[4] << 8 | data[5]) >>> 0;
  const compatibilityString = compatibility.toString(16).toUpperCase().replace(/^0+(?=.)/, "");
  const tier = data[1] & 32 ? "H" : "L";
  const level = data[12];
  const constraints = Array.from(data.slice(6, 12));
  while (constraints.length && constraints[constraints.length - 1] === 0) constraints.pop();
  const constraintString = constraints.length ? `.${constraints.map((byte) => byte.toString(16).toUpperCase().padStart(2, "0")).join("")}` : "";
  return `hvc1.${profileSpace}${profile}.${compatibilityString}.${tier}${level}${constraintString}`;
}

// src/playback/hevc/mse-probe.js
function isHevcMseSupported(codecPrivate3) {
  if (typeof MediaSource === "undefined" || typeof MediaSource.isTypeSupported !== "function") return false;
  const codec = hevcCodecString(codecPrivate3);
  return Boolean(codec && MediaSource.isTypeSupported(`video/mp4; codecs="${codec}"`));
}

// src/playback/strategy.js
function resolvePlaybackStrategy(tracks, options = {}) {
  const transcodeEnabled = options.transcode === true || options.transcode === "auto";
  const videoTrack = tracks.find((track) => track.type === TRACK_TYPES.VIDEO);
  const audioTrack = tracks.find((track) => track.type === TRACK_TYPES.AUDIO);
  const codecs = [videoTrack, audioTrack].filter(Boolean).map((track) => track.codecId);
  if (!videoTrack && !audioTrack) {
    return { strategy: "unsupported", supported: false, reason: "No video or audio tracks found", videoTrack, audioTrack, codecs };
  }
  if (videoTrack && videoTrack.codecId === CODEC_IDS.V_MPEGH_HEVC) {
    if (transcodeEnabled) {
      return { strategy: "transcode", supported: true, reason: "HEVC requires remux or transcode", videoTrack, audioTrack, codecs };
    }
    if (isHevcMseSupported(videoTrack.codecPrivate)) {
      return { strategy: "remux-hevc", supported: true, videoTrack, audioTrack, codecs };
    }
    return { strategy: "transcode", supported: false, reason: "HEVC requires remux or transcode", videoTrack, audioTrack, codecs };
  }
  const supportedVideo = !videoTrack || videoTrack.codecId === CODEC_IDS.V_MPEG4_ISO_AVC || videoTrack.codecId === "V_AV1";
  const supportedAudio = !audioTrack || audioTrack.codecId === CODEC_IDS.A_AAC || audioTrack.codecId === CODEC_IDS.A_MPEG_L3;
  if (!supportedVideo || !supportedAudio) {
    const reason = !supportedVideo ? `Unsupported video codec: ${videoTrack.codecId || "unknown"}` : `Unsupported audio codec: ${audioTrack.codecId || "unknown"}`;
    if (transcodeEnabled) return { strategy: "transcode", supported: true, reason, videoTrack, audioTrack, codecs };
    return { strategy: "unsupported", supported: false, reason, videoTrack, audioTrack, codecs };
  }
  return { strategy: "remux-mse", supported: true, videoTrack, audioTrack, codecs };
}

// src/playback/codecs.js
function getPlaybackSupport(tracks) {
  const strategy = resolvePlaybackStrategy(tracks);
  const reason = strategy.reason === "HEVC requires remux or transcode" ? `Unsupported video codec: ${CODEC_IDS.V_MPEGH_HEVC}; ${strategy.reason}` : strategy.reason;
  return {
    supported: strategy.supported,
    videoTrack: strategy.videoTrack,
    audioTrack: strategy.audioTrack,
    ...reason ? { reason } : {}
  };
}

// src/playback/hevc/remux-hevc.js
function bytes(...parts) {
  const output = new Uint8Array(parts.reduce((length, part) => length + part.length, 0));
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
function u16(value) {
  const output = new Uint8Array(2);
  new DataView(output.buffer).setUint16(0, value);
  return output;
}
function box(type, content) {
  return bytes(u32(content.length + 8), new TextEncoder().encode(type), content);
}
function codecPrivate(track) {
  return track.codecPrivate instanceof Uint8Array ? track.codecPrivate : new Uint8Array(track.codecPrivate || []);
}
function hevcVisualSampleEntry(track) {
  const width = track.width || 1920;
  const height = track.height || 1080;
  const compressor = new Uint8Array(32);
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
    box("hvcC", codecPrivate(track))
  );
  return box("hvc1", data);
}
function nextStart(data, start) {
  for (let i = start; i + 3 < data.length; i++) {
    if (data[i] === 0 && data[i + 1] === 0 && (data[i + 2] === 1 || data[i + 2] === 0 && data[i + 3] === 1)) return i;
  }
  return data.length;
}
function hevcSample(data) {
  const input = data instanceof Uint8Array ? data : new Uint8Array(data);
  const nals = [];
  let start = 0;
  while (start < input.length) {
    let marker = -1;
    for (let i = start; i + 3 < input.length; i++) {
      if (input[i] === 0 && input[i + 1] === 0 && (input[i + 2] === 1 || input[i + 2] === 0 && input[i + 3] === 1)) {
        marker = i;
        break;
      }
    }
    if (marker < 0) break;
    const nalStart = marker + (input[marker + 2] === 1 ? 3 : 4);
    const nalEnd = nextStart(input, nalStart);
    if (nalEnd > nalStart) nals.push(bytes(u32(nalEnd - nalStart), input.slice(nalStart, nalEnd)));
    start = nalEnd;
  }
  return nals.length ? bytes(...nals) : input;
}

// src/playback/remux.js
var encoder = new TextEncoder();
function bytes2(...parts) {
  const length = parts.reduce((total, part) => total + part.length, 0);
  const output = new Uint8Array(length);
  let offset = 0;
  parts.forEach((part) => {
    output.set(part, offset);
    offset += part.length;
  });
  return output;
}
function u322(value) {
  const output = new Uint8Array(4);
  new DataView(output.buffer).setUint32(0, value >>> 0);
  return output;
}
function i32(value) {
  const output = new Uint8Array(4);
  new DataView(output.buffer).setInt32(0, value);
  return output;
}
function u162(value) {
  const output = new Uint8Array(2);
  new DataView(output.buffer).setUint16(0, value);
  return output;
}
function box2(type, ...contents) {
  const body = bytes2(...contents);
  return bytes2(u322(body.length + 8), encoder.encode(type), body);
}
function fullBox(type, version, flags, ...contents) {
  return box2(type, bytes2(new Uint8Array([version]), new Uint8Array([
    flags >>> 16 & 255,
    flags >>> 8 & 255,
    flags & 255
  ]), ...contents));
}
function codecPrivate2(track) {
  return track.codecPrivate instanceof Uint8Array ? track.codecPrivate : track.codecPrivate ? new Uint8Array(track.codecPrivate) : new Uint8Array(0);
}
function avcConfig(track) {
  const privateData = codecPrivate2(track);
  if (privateData.length >= 7 && privateData[0] === 1) return privateData;
  const sps = findNal(privateData, 7);
  const pps = findNal(privateData, 8);
  if (!sps || !pps) {
    return new Uint8Array([1, 66, 0, 30, 255, 225, 0, 0, 1, 0, 0, 0, 1, 0]);
  }
  return bytes2(
    new Uint8Array([1, sps[1] || 66, sps[2] || 0, sps[3] || 30, 255, 225]),
    u162(sps.length),
    sps,
    new Uint8Array([1]),
    u162(pps.length),
    pps
  );
}
function findNal(data, type) {
  let start = 0;
  while (start + 4 < data.length) {
    if (data[start] === 0 && data[start + 1] === 0 && (data[start + 2] === 1 || data[start + 2] === 0 && data[start + 3] === 1)) {
      const header = data[start + 2] === 1 ? start + 3 : start + 4;
      const end = nextStart2(data, header);
      if ((data[header] & 31) === type) return data.slice(header, end);
      start = end;
    } else start++;
  }
  return null;
}
function nextStart2(data, start) {
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
  if (output.length && offset === input.length) return bytes2(...output);
  const nals = [];
  let start = 0;
  while (start < input.length) {
    const marker = startCode(input, start);
    if (marker < 0) break;
    const nalStart = marker + (input[marker + 2] === 1 ? 3 : 4);
    const nalEnd = nextStart2(input, nalStart);
    if (nalEnd > nalStart) nals.push(bytes2(u322(nalEnd - nalStart), input.slice(nalStart, nalEnd)));
    start = nalEnd;
  }
  return nals.length ? bytes2(...nals) : input;
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
  if (track.codecId === CODEC_IDS.V_MPEGH_HEVC) return hevcVisualSampleEntry(track);
  const width = track.width || 1920;
  const height = track.height || 1080;
  const compressor = new Uint8Array(32);
  const config = box2("avcC", avcConfig(track));
  const data = bytes2(
    new Uint8Array(6),
    u162(1),
    new Uint8Array(16),
    u162(width),
    u162(height),
    u322(4718592),
    u322(4718592),
    new Uint8Array(4),
    new Uint8Array([0, 0]),
    compressor,
    u162(24),
    u162(65535),
    config
  );
  return box2("avc1", data);
}
function audioSampleEntry(track) {
  const config = codecPrivate2(track);
  const esds = fullBox("esds", 0, 0, bytes2(
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
  return box2("mp4a", bytes2(
    new Uint8Array(6),
    u162(1),
    new Uint8Array(8),
    u162(track.channels || 2),
    u162(16),
    u162(0),
    u162(0),
    u322(rate << 16),
    esds
  ));
}
function trackBox(track, id) {
  const video = track.type === TRACK_TYPES.VIDEO;
  const handler = video ? "vide" : "soun";
  const sampleEntry = video ? visualSampleEntry(track) : audioSampleEntry(track);
  const stbl = box2(
    "stbl",
    box2("stsd", bytes2(new Uint8Array([0, 0, 0, 0]), u322(1), sampleEntry)),
    box2("stts", new Uint8Array(8)),
    box2("stsc", new Uint8Array(8)),
    box2("stsz", new Uint8Array(12)),
    box2("stco", new Uint8Array(8))
  );
  const minf = box2(
    "minf",
    video ? box2("vmhd", new Uint8Array(8)) : box2("smhd", new Uint8Array(4)),
    box2("dinf", box2("dref", bytes2(new Uint8Array(4), u322(1), box2("url ", new Uint8Array([0, 0, 0, 1]))))),
    stbl
  );
  const tkhd = fullBox(
    "tkhd",
    0,
    7,
    new Uint8Array(16),
    u322(id),
    new Uint8Array(8),
    u162(0),
    new Uint8Array(2),
    new Uint8Array(8),
    u322(65536),
    new Uint8Array(8),
    u322(video ? (track.width || 1920) << 16 : 0),
    u322(video ? (track.height || 1080) << 16 : 0)
  );
  const mdhd = fullBox("mdhd", 0, 0, new Uint8Array(8), u322(1e3), u322(0), u162(21956), u162(0));
  const hdlr = fullBox(
    "hdlr",
    0,
    0,
    new Uint8Array(4),
    encoder.encode(handler),
    new Uint8Array(12),
    encoder.encode(video ? "VideoHandler\0" : "SoundHandler\0")
  );
  return box2("trak", tkhd, box2("mdia", mdhd, hdlr, minf));
}
async function createInitSegment(tracks) {
  const videoBrand = tracks.some((track) => track.codecId === CODEC_IDS.V_MPEGH_HEVC) ? "hvc1" : "avc1";
  const selected = tracks.filter((track) => track.type === TRACK_TYPES.VIDEO || track.type === TRACK_TYPES.AUDIO);
  const mvhd = fullBox(
    "mvhd",
    0,
    0,
    new Uint8Array(8),
    u322(1e3),
    u322(0),
    u322(65536),
    u162(256),
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
    u322(index + 1),
    u322(1),
    u322(0),
    u322(0),
    u322(0),
    u322(0)
  ));
  return bytes2(box2("ftyp", bytes2(
    encoder.encode("isom"),
    new Uint8Array([0, 0, 2, 0]),
    encoder.encode(`isomiso6${videoBrand}mp41`)
  )), box2(
    "moov",
    mvhd,
    ...selected.map((track, index) => trackBox(track, index + 1)),
    box2("mvex", ...trex)
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
      const data = block.trackType === TRACK_TYPES.AUDIO ? audioSample(block.data, block.track) : block.track.codecId === CODEC_IDS.V_MPEGH_HEVC ? hevcSample(block.data) : h264Sample(block.data);
      samples.push({ trackNumber, block, data, duration: Math.max(1, Math.round(block.durationMs || block.duration || 33)), index });
    });
  });
  samples.sort((a, b) => (a.block.blockTimestamp || a.block.timecode || 0) - (b.block.blockTimestamp || b.block.timecode || 0));
  const trackSamplesByNumber = /* @__PURE__ */ new Map();
  grouped.forEach((trackBlocks, trackNumber) => {
    trackSamplesByNumber.set(trackNumber, samples.filter((sample) => sample.trackNumber === trackNumber));
  });
  const payload = bytes2(...Array.from(trackSamplesByNumber.values()).flat().map((sample) => sample.data));
  function makeMoof(dataOffset) {
    const trafs = [];
    grouped.forEach((trackBlocks, trackNumber) => {
      const trackSamples = trackSamplesByNumber.get(trackNumber);
      const entries = trackSamples.map((sample) => bytes2(
        u322(sample.duration),
        u322(sample.data.length),
        u322(sample.block.keyframe ? 33554432 : 16842752)
      ));
      const trun = fullBox("trun", 0, 1793, u322(trackSamples.length), i32(dataOffset), ...entries);
      const tfhd = fullBox("tfhd", 0, 131072, u322(trackNumber));
      const timestamp = Math.round(trackBlocks[0].blockTimestamp || trackBlocks[0].timecode || 0);
      const tfdt = fullBox("tfdt", 0, 0, u322(Math.max(0, timestamp)));
      trafs.push(box2("traf", tfhd, tfdt, trun));
    });
    return box2("moof", fullBox("mfhd", 0, 0, u322(sequenceNumber)), ...trafs);
  }
  let moof = makeMoof(0);
  moof = makeMoof(moof.length + 8);
  return bytes2(moof, box2("mdat", payload));
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

// src/browser/blob-manager.js
var urls = /* @__PURE__ */ new Set();
function createBlobUrl(value) {
  const url = URL.createObjectURL(value);
  urls.add(url);
  return url;
}
function revokeBlobUrl(url) {
  if (!url) return;
  URL.revokeObjectURL(url);
  urls.delete(url);
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
  async load(demuxResult, loadOptions = {}) {
    const signal = loadOptions.signal || this.options.signal;
    if (signal && signal.aborted) throw abortError2();
    const support = getPlaybackSupport(demuxResult.tracks);
    if (!support.supported) throw new Error(support.reason);
    if (typeof MediaSource === "undefined") throw new Error("MediaSource is not supported");
    const result = await remuxToMp4(demuxResult, this.options);
    if (signal && signal.aborted) throw abortError2();
    const source = new MediaSource();
    this.source = source;
    this.objectUrl = createBlobUrl(source);
    this.video.src = this.objectUrl;
    await new Promise((resolve, reject) => {
      const onAbort = () => reject(abortError2());
      if (signal) signal.addEventListener("abort", onAbort, { once: true });
      source.addEventListener("sourceopen", () => {
        if (signal && signal.aborted) {
          reject(abortError2());
          return;
        }
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
        if (signal) signal.removeEventListener("abort", onAbort);
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
    if (this.objectUrl) revokeBlobUrl(this.objectUrl);
    this.video.removeAttribute("src");
    this.video.load();
    this.queue = [];
    this.buffer = null;
    this.source = null;
  }
};
function abortError2() {
  const error = new Error("MSE load aborted");
  error.name = "AbortError";
  return error;
}
function awaitBuffer(blob) {
  return blob.arrayBuffer().then((buffer) => new Uint8Array(buffer));
}
function codecString(track) {
  if (track.codecId === CODEC_IDS.V_MPEGH_HEVC) return hevcCodecString(track.codecPrivate);
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

// src/subtitles/overlay/vtt-track-renderer.js
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
var VttTrackRenderer = class {
  attach(video, demuxResult, track, options = {}) {
    const doc = options.document || video.ownerDocument || (typeof document !== "undefined" ? document : null);
    if (!doc || typeof doc.createElement !== "function") {
      throw new Error("VttTrackRenderer requires a document");
    }
    const cues = options.cues || extractCues(demuxResult, track.number);
    const format = options.format || (cues[0] ? cues[0].format : "srt");
    const vtt = cuesToVtt(cues, format);
    const blobUrl = createBlobUrl(new Blob([vtt], { type: "text/vtt" }));
    const element = doc.createElement("track");
    element.kind = "subtitles";
    element.srclang = track.language || options.defaultLanguage || "und";
    element.label = track.name || track.language || `Subtitle ${options.index + 1}`;
    element.src = blobUrl;
    element.default = Boolean(track.default);
    video.appendChild(element);
    return {
      track,
      element,
      format,
      cues,
      src: blobUrl,
      revoke() {
        revokeBlobUrl(blobUrl);
        if (element && typeof element.remove === "function") element.remove();
      }
    };
  }
};

// src/subtitles/overlay/font-loader.js
var FONT_MIME_PREFIXES = [
  "application/x-truetype-font",
  "application/vnd.ms-opentype",
  "font/otf",
  "font/ttf",
  "font/woff",
  "font/woff2"
];
function isFontAttachment(attachment) {
  const mime = String(attachment.mimeType || "").toLowerCase();
  const name = String(attachment.name || "").toLowerCase();
  return FONT_MIME_PREFIXES.some((prefix) => mime.startsWith(prefix)) || /\.(ttf|otf|woff2?)$/i.test(name);
}
async function loadEmbeddedFonts(demuxResult, options = {}) {
  const doc = options.document || (typeof document !== "undefined" ? document : null);
  const attachments = demuxResult && demuxResult.attachments || [];
  const fontUrls = [];
  const styleElements = [];
  attachments.filter(isFontAttachment).forEach((attachment) => {
    if (!attachment.data) return;
    const mime = attachment.mimeType || "font/otf";
    const blobUrl = createBlobUrl(new Blob([attachment.data], { type: mime }));
    fontUrls.push(blobUrl);
    if (doc && typeof doc.createElement === "function") {
      const style = doc.createElement("style");
      const family = attachment.name ? attachment.name.replace(/\.[^.]+$/, "") : "mkv-font";
      style.textContent = `@font-face{font-family:"${family}";src:url("${blobUrl}")}`;
      if (doc.head && typeof doc.head.appendChild === "function") doc.head.appendChild(style);
      styleElements.push(style);
    }
  });
  return {
    urls: fontUrls,
    revoke() {
      fontUrls.forEach(revokeBlobUrl);
      styleElements.forEach((element) => {
        if (element && typeof element.remove === "function") element.remove();
      });
    }
  };
}

// src/subtitles/overlay/ass-renderer.js
var dynamicImport = new Function("specifier", "return import(specifier)");
async function defaultAkariModuleLoader() {
  try {
    const mod = await dynamicImport("akarisub");
    return mod.default || mod.AkariSub;
  } catch (error) {
    const missing = new Error("Install akarisub peer dependency to enable styled ASS subtitles");
    missing.cause = error;
    throw missing;
  }
}
var akariModuleLoader = defaultAkariModuleLoader;
var AssRenderer = class {
  async attach(video, track, cues, blocks, options = {}) {
    if (options._testMock) {
      return { track, format: "ass", revoke() {
      } };
    }
    const subContent = assData(track, cues, blocks);
    const AkariSub = await akariModuleLoader();
    const fonts = await loadEmbeddedFonts(options.demuxResult, options);
    const renderer = new AkariSub({
      video,
      subContent,
      canvas: options.canvas,
      workerUrl: options.overlay && options.overlay.assWorkerUrl,
      wasmUrl: options.overlay && options.overlay.assWasmUrl
    });
    return {
      track,
      format: "ass",
      renderer,
      revoke() {
        if (renderer && typeof renderer.destroy === "function") renderer.destroy();
        if (fonts && fonts.revoke) fonts.revoke();
      }
    };
  }
};
function createAssRenderer() {
  return new AssRenderer();
}

// src/subtitles/bitmap/pgs-adapter.js
function blockPayload(block) {
  if (block.data instanceof Uint8Array) return block.data;
  if (typeof block.data === "string") return new TextEncoder().encode(block.data);
  return new Uint8Array(0);
}
function blocksToPgsBuffer(blocks) {
  const parts = (blocks || []).map(blockPayload);
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(total);
  let offset = 0;
  parts.forEach((part) => {
    output.set(part, offset);
    offset += part.length;
  });
  return output.buffer;
}

// src/subtitles/overlay/pgs-renderer.js
var dynamicImport2 = new Function("specifier", "return import(specifier)");
async function defaultPgsModuleLoader() {
  try {
    const mod = await dynamicImport2("libbitsub");
    return mod.PgsRenderer;
  } catch (error) {
    const missing = new Error("Install libbitsub peer dependency to enable PGS subtitles");
    missing.cause = error;
    throw missing;
  }
}
var pgsModuleLoader = defaultPgsModuleLoader;
var PgsRendererAdapter = class {
  async attach(video, track, cues, blocks, options = {}) {
    if (options._testMock) {
      return { track, format: "pgs", revoke() {
      } };
    }
    const PgsRenderer = await pgsModuleLoader();
    const subContent = blocksToPgsBuffer(blocks);
    const renderer = new PgsRenderer({
      video,
      subContent,
      canvas: options.canvas,
      workerUrl: options.overlay && options.overlay.pgsWorkerUrl,
      onError: (error) => {
        if (typeof console !== "undefined" && console.warn) {
          console.warn("PGS renderer error", error);
        }
      }
    });
    return {
      track,
      format: "pgs",
      renderer,
      revoke() {
        if (renderer && typeof renderer.dispose === "function") renderer.dispose();
      }
    };
  }
};
function createPgsRenderer() {
  return new PgsRendererAdapter();
}

// src/subtitles/overlay/overlay-manager.js
function createCanvasOverlay(videoElement, options = {}) {
  const doc = options.document || videoElement.ownerDocument || (typeof document !== "undefined" ? document : null);
  if (!doc || typeof doc.createElement !== "function") {
    throw new Error("OverlayManager requires a document");
  }
  const canvas = doc.createElement("canvas");
  if (typeof canvas.setAttribute === "function") canvas.setAttribute("aria-hidden", "true");
  if (!canvas.style) canvas.style = {};
  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.objectFit = "contain";
  const parent = videoElement.parentElement || videoElement;
  if (parent && typeof parent.appendChild === "function") parent.appendChild(canvas);
  return canvas;
}
var OverlayManager = class {
  constructor(videoElement, options = {}) {
    if (!videoElement) throw new TypeError("OverlayManager requires a video element");
    this.video = videoElement;
    this.options = {
      assRenderer: "auto",
      bitmapSubtitles: "auto",
      ...options
    };
    this.canvas = options.createCanvas === false ? null : createCanvasOverlay(videoElement, options);
    this.entries = [];
    this.activeTrack = options.subtitleTrack;
    this.visible = true;
    this._fullscreenChange = () => this._handleFullscreen();
    const doc = options.document || videoElement.ownerDocument || (typeof document !== "undefined" ? document : null);
    if (doc && doc.addEventListener) doc.addEventListener("fullscreenchange", this._fullscreenChange);
  }
  async attachFromDemux(demuxResult, options = {}) {
    const merged = { ...this.options, ...options, demuxResult, canvas: this.canvas };
    const tracks = (demuxResult.tracks || []).filter((track) => track.type === TRACK_TYPES.SUBTITLE);
    this._revokeEntries();
    const vttRenderer = new VttTrackRenderer();
    const entries = [];
    for (let index = 0; index < tracks.length; index++) {
      const track = tracks[index];
      const cues = extractCues(demuxResult, track.number);
      const blocks = getBlocks2(demuxResult, track.number);
      const isBitmap = isBitmapSubtitleCodec(track.codecId);
      if (isBitmap) {
        if (merged.bitmapSubtitles === false) continue;
        try {
          entries.push(await createPgsRenderer(merged).attach(this.video, track, cues, blocks, merged));
        } catch (error) {
          warnFallback(error, "bitmap subtitle");
        }
        continue;
      }
      const wantsLibass = merged.assRenderer === "libass" || merged.assRenderer === "auto";
      if (isAss(track, cues) && wantsLibass) {
        try {
          entries.push(await createAssRenderer(merged).attach(this.video, track, cues, blocks, merged));
          continue;
        } catch (error) {
          if (merged.assRenderer === "libass") warnFallback(error, "ASS subtitle");
        }
      }
      entries.push(vttRenderer.attach(this.video, demuxResult, track, {
        ...merged,
        cues,
        index
      }));
    }
    this.entries = entries;
    this._applyTrackSelection();
    return this;
  }
  setActiveTrack(trackNumber) {
    this.activeTrack = trackNumber;
    this._applyTrackSelection();
  }
  setVisible(visible) {
    this.visible = Boolean(visible);
    if (this.canvas && this.canvas.style) this.canvas.style.display = this.visible ? "" : "none";
    this.entries.forEach((entry) => {
      if (entry.element && entry.element.track) {
        entry.element.track.mode = this.visible ? "hidden" : "disabled";
      }
    });
  }
  destroy() {
    this._revokeEntries();
    const doc = this.options.document || this.video.ownerDocument || (typeof document !== "undefined" ? document : null);
    if (doc && doc.removeEventListener) doc.removeEventListener("fullscreenchange", this._fullscreenChange);
    if (this.canvas && typeof this.canvas.remove === "function") this.canvas.remove();
    this.canvas = null;
  }
  revokeAll() {
    this.destroy();
  }
  get tracks() {
    return this.entries;
  }
  _revokeEntries() {
    this.entries.forEach((entry) => {
      if (entry.revoke) entry.revoke();
    });
    this.entries = [];
  }
  _applyTrackSelection() {
    this.entries.forEach((entry) => {
      if (!entry.element || !entry.element.track) return;
      const selected = this.activeTrack == null || entry.track.number === this.activeTrack;
      entry.element.track.mode = selected && this.visible ? "hidden" : "disabled";
    });
  }
  _handleFullscreen() {
    const doc = this.options.document || this.video.ownerDocument || (typeof document !== "undefined" ? document : null);
    const fullscreenElement = doc && doc.fullscreenElement;
    if (!this.canvas || !fullscreenElement || typeof fullscreenElement.appendChild !== "function") return;
    if (fullscreenElement === this.video || typeof fullscreenElement.contains === "function" && fullscreenElement.contains(this.video)) {
      fullscreenElement.appendChild(this.canvas);
    }
  }
};
function getBlocks2(result, trackNumber) {
  const blocks = result.blocksByTrack instanceof Map ? result.blocksByTrack.get(trackNumber) : result.blocksByTrack && result.blocksByTrack[trackNumber];
  return (blocks || []).slice().sort((a, b) => a.timecode - b.timecode);
}
function isAss(track, cues) {
  return track.codecId === CODEC_IDS.S_TEXT_ASS || track.codecId === CODEC_IDS.S_TEXT_SSA || cues[0] && cues[0].format === "ass";
}
function warnFallback(error, kind) {
  if (typeof console !== "undefined" && console.warn) {
    console.warn(`Unable to render ${kind}; skipping or falling back to WebVTT`, error);
  }
}

// src/browser/worker-client.js
function createWorkerClient(options = {}) {
  const script = typeof document !== "undefined" && document.currentScript;
  const base = script ? script.src : location.href;
  const defaultUrl = new URL(base.includes("/iife/") ? "../worker/mkv-worker.js" : "worker/mkv-worker.js", base);
  const worker = options.worker || new Worker(options.workerUrl || defaultUrl, { type: "module" });
  let nextId = 0;
  const pending = /* @__PURE__ */ new Map();
  worker.onmessage = (event) => {
    const message = event.data || {};
    const request = pending.get(message.id);
    if (!request) return;
    if (message.type === "progress") {
      if (request.onProgress) request.onProgress(message.percentage, message.eta);
      return;
    }
    pending.delete(message.id);
    if (message.type === "error") {
      const error = new Error(message.error);
      error.name = message.name || "Error";
      request.reject(error);
      return;
    }
    request.resolve(deserializeResult(message.result));
  };
  worker.onerror = (event) => {
    pending.forEach((request) => request.reject(event.error || new Error(event.message || "Worker error")));
    pending.clear();
  };
  return {
    demux(source, options2 = {}) {
      const id = ++nextId;
      const transferable = source instanceof ArrayBuffer ? source : null;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject, onProgress: options2.onProgress });
        if (options2.signal) {
          if (options2.signal.aborted) {
            pending.delete(id);
            reject(abortError3());
            return;
          }
          options2.signal.addEventListener("abort", () => {
            if (!pending.has(id)) return;
            pending.delete(id);
            reject(abortError3());
          }, { once: true });
        }
        const workerOptions = { ...options2 };
        delete workerOptions.onProgress;
        delete workerOptions.signal;
        worker.postMessage({ type: "demux", id, source, options: workerOptions }, transferable ? [transferable] : []);
      });
    },
    terminate() {
      pending.forEach((request) => request.reject(new Error("Worker terminated")));
      pending.clear();
      worker.terminate();
    }
  };
}
function abortError3() {
  const error = new Error("Demux aborted");
  error.name = "AbortError";
  return error;
}
function deserializeResult(result) {
  const blocksByTrack = /* @__PURE__ */ new Map();
  (result.blocks || []).forEach(([trackNumber, blocks]) => {
    blocksByTrack.set(trackNumber, blocks.map((block) => ({
      ...block,
      data: block.data && block.data.type === "bytes" ? new Uint8Array(block.data.buffer) : block.data
    })));
  });
  return { ...result, blocksByTrack };
}

// src/playback/transcode/ffmpeg-client.js
var ffmpeg = null;
var loadPromise = null;
var dynamicImport3 = new Function("specifier", "return import(specifier)");
var DEFAULT_CORE_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js";
var DEFAULT_WASM_URL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm";
async function defaultFfmpegModuleLoader() {
  try {
    const ffmpegModule = await dynamicImport3("@ffmpeg/ffmpeg");
    const utilModule = await dynamicImport3("@ffmpeg/util");
    return { FFmpeg: ffmpegModule.FFmpeg, toBlobURL: utilModule.toBlobURL };
  } catch (error) {
    const missing = new Error("Install @ffmpeg/ffmpeg and @ffmpeg/util to enable transcode");
    missing.cause = error;
    throw missing;
  }
}
var ffmpegModuleLoader = defaultFfmpegModuleLoader;
async function loadFfmpeg(options = {}) {
  if (ffmpeg) return ffmpeg;
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    const { FFmpeg, toBlobURL } = await ffmpegModuleLoader();
    const instance = new FFmpeg();
    const coreURL = options.coreURL || DEFAULT_CORE_URL;
    const wasmURL = options.wasmURL || DEFAULT_WASM_URL;
    await instance.load({
      coreURL: await toBlobURL(coreURL, "text/javascript"),
      wasmURL: await toBlobURL(wasmURL, "application/wasm")
    });
    if (typeof options.onProgress === "function") {
      instance.on("progress", ({ progress }) => options.onProgress(Math.round(progress * 100), "transcode"));
    }
    ffmpeg = instance;
    return instance;
  })();
  try {
    return await loadPromise;
  } catch (error) {
    loadPromise = null;
    throw error;
  }
}
async function transcodeToMp4(input, options = {}) {
  const instance = await loadFfmpeg(options);
  const data = input instanceof Uint8Array ? input : new Uint8Array(input instanceof ArrayBuffer ? input : await input.arrayBuffer());
  await instance.writeFile("input.mkv", data);
  await instance.exec([
    "-i",
    "input.mkv",
    "-c:v",
    "libx264",
    "-preset",
    options.preset || "fast",
    "-crf",
    "23",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-movflags",
    "+faststart",
    "output.mp4"
  ]);
  const output = await instance.readFile("output.mp4");
  return { blob: new Blob([output], { type: "video/mp4" }), mimeType: "video/mp4" };
}

// src/playback/strategies/transcode-strategy.js
async function executeTranscodePlayback(video, source, options = {}) {
  const result = await transcodeToMp4(source, options);
  const url = createBlobUrl(result.blob);
  video.src = url;
  return { ...result, url };
}

// src/playback/player.js
var MKVPlayer = class {
  constructor(videoElement, options = {}) {
    if (!videoElement) throw new TypeError("MKVPlayer requires a video element");
    this.video = videoElement;
    this.options = {
      assRenderer: "auto",
      bitmapSubtitles: "auto",
      transcode: false,
      ...options
    };
    this.mse = null;
    this.fallbackUrl = null;
    this.overlayManager = null;
    this.result = null;
    this.support = null;
    this.workerClient = null;
  }
  async load(source, loadOptions = {}) {
    this.destroy();
    const options = { ...this.options, ...loadOptions };
    const demuxOptions = {
      collectMediaBlocks: true,
      signal: options.signal,
      onProgress: options.onProgress
    };
    const result = options.useWorker ? await (this.workerClient || (this.workerClient = createWorkerClient(options))).demux(
      source instanceof ArrayBuffer ? source.slice(0) : await source.arrayBuffer(),
      demuxOptions
    ) : await demuxer_default(source, demuxOptions);
    const support = resolvePlaybackStrategy(result.tracks, options);
    if (!support.supported) throw new Error(support.reason);
    this.result = result;
    this.support = support;
    if (support.strategy === "transcode") {
      const transcoded = await executeTranscodePlayback(this.video, source, options);
      this.fallbackUrl = transcoded.url;
      this.overlayManager = new OverlayManager(this.video, options);
      await this.overlayManager.attachFromDemux(result, options);
      if (typeof options.onProgress === "function") options.onProgress(100, 0);
      return this;
    }
    if (support.strategy !== "remux-mse" && support.strategy !== "remux-hevc") {
      throw new Error(`${support.strategy} playback is not yet implemented`);
    }
    try {
      this.mse = new MSEPlayer(this.video, options);
      await this.mse.load(result, { signal: options.signal });
    } catch (error) {
      if (this.mse) this.mse.destroy();
      this.mse = null;
      try {
        const remuxed = await remuxToMp4(result, options);
        this.fallbackUrl = createBlobUrl(remuxed.blob);
        this.video.src = this.fallbackUrl;
      } catch (remuxError) {
        if (options.transcode !== "auto") throw remuxError;
        const transcoded = await executeTranscodePlayback(this.video, source, options);
        this.fallbackUrl = transcoded.url;
      }
    }
    this.overlayManager = new OverlayManager(this.video, options);
    await this.overlayManager.attachFromDemux(result, options);
    if (typeof options.onProgress === "function") options.onProgress(100, 0);
    return this;
  }
  destroy() {
    if (this.mse) this.mse.destroy();
    if (this.overlayManager) this.overlayManager.destroy();
    if (this.fallbackUrl) {
      revokeBlobUrl(this.fallbackUrl);
      this.video.removeAttribute("src");
      this.video.load();
    }
    this.mse = null;
    this.overlayManager = null;
    this.fallbackUrl = null;
    this.result = null;
    this.support = null;
    if (this.workerClient) this.workerClient.terminate();
    this.workerClient = null;
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
    anchor.href = createBlobUrl(blob);
    anchor.download = filename;
    anchor.click();
    setTimeout(() => revokeBlobUrl(anchor.href), 0);
    return blob;
  }
};
function createPlayer(videoElement, options) {
  return new MKVPlayer(videoElement, options);
}

// src/playback/subtitles.js
async function attachSubtitleTracks(videoElement, demuxResult, options = {}) {
  const manager = new OverlayManager(videoElement, { ...options, createCanvas: false });
  await manager.attachFromDemux(demuxResult, options);
  return manager;
}

// src/extract/zip-export.js
function exportZip(files, filename, JSZip, saveAs) {
  const zip = new JSZip();
  files.forEach((file) => {
    const folder = file.folder ? zip.folder(file.folder) : zip;
    folder.file(file.name, file.data);
  });
  return zip.generateAsync({ type: "blob" }).then((content) => saveAs(content, filename));
}
var zip_export_default = exportZip;

// src/browser/demo.js
function createExtractorUI(options = {}) {
  const doc = options.document || document;
  const root = options.root || doc;
  const input = options.input || root.querySelector("input");
  const droparea = options.droparea || root.querySelector(".file-drop-area");
  const statusEl = options.statusEl || root.querySelector(".file-msg");
  const globals = typeof window !== "undefined" ? window : {};
  const JSZip = options.JSZip || globals.JSZip;
  const saveAs = options.saveAs || globals.saveAs;
  if (!input || !droparea || !statusEl) {
    throw new TypeError("extractor UI requires an input, file-drop-area, and file-msg element");
  }
  if (!JSZip || !saveAs) {
    throw new TypeError("extractor UI requires JSZip and saveAs");
  }
  input.addEventListener("change", handleFiles);
  ["dragenter", "focus", "click"].forEach((event) => input.addEventListener(event, () => {
    droparea.classList.add("is-active");
  }));
  ["dragleave", "blur", "drop"].forEach((event) => input.addEventListener(event, () => {
    droparea.classList.remove("is-active");
  }));
  return { destroy: () => input.removeEventListener("change", handleFiles) };
  function handleFiles(event) {
    const files = Array.from(event.target.files);
    statusEl.textContent = `Loading ${files.length} ${files.length === 1 ? "file" : "files"}...`;
    const loadedData = [];
    let errors = 0;
    processFile(0);
    function processFile(index) {
      if (!files[index]) return packData();
      const file = files[index];
      demuxer_default(file, {
        onProgress: (percentage, eta) => {
          statusEl.textContent = "Loading file " + (index + 1) + " / " + files.length + ": " + percentage.toFixed(2) + "% (" + formatDuration(eta) + " remaining)";
        }
      }).then((result) => {
        loadedData.push({
          filename: file.name,
          data: extract_default(result).concat(attachments_default(result))
        });
        processFile(index + 1);
      }).catch(() => {
        errors++;
        processFile(index + 1);
      });
    }
    function packData() {
      statusEl.textContent = `${loadedData.length} ${loadedData.length === 1 ? "file" : "files"} extracted - ${errors} failed`;
      if (loadedData.length === 0) return;
      const entries = [];
      let filename;
      if (loadedData.length === 1) {
        filename = loadedData[0].filename + "_tracks.zip";
        loadedData[0].data.forEach((entry) => entries.push(entry));
      } else {
        filename = `${Date.now().toString(36)}_tracks.zip`;
        loadedData.forEach((file) => file.data.forEach((entry) => {
          entries.push({ name: entry.name, data: entry.data, folder: file.filename });
        }));
      }
      zip_export_default(entries, filename, JSZip, saveAs);
    }
  }
}

// src/browser/mkv-player-element.js
var ElementBase = typeof HTMLElement === "undefined" ? class {
} : HTMLElement;
function parseBooleanAttribute(element, name) {
  if (!element.hasAttribute(name)) return void 0;
  const value = element.getAttribute(name);
  if (value === "" || value === "true") return true;
  if (value === "false") return false;
  if (value === "auto") return "auto";
  return value;
}
var MKVPlayerElement = class extends ElementBase {
  constructor() {
    super();
    this.video = document.createElement("video");
    this.video.controls = true;
    this.appendChild(this.video);
    this.player = null;
  }
  connectedCallback() {
    this.addEventListener("dragover", preventDefault);
    this.addEventListener("drop", this.handleDrop);
    const src = this.getAttribute("src");
    if (src) this.load(src);
  }
  disconnectedCallback() {
    this.removeEventListener("drop", this.handleDrop);
    if (this.player) this.player.destroy();
  }
  set file(value) {
    if (value) this.load(value);
  }
  getPlayerOptions() {
    return {
      useWorker: this.hasAttribute("use-worker"),
      transcode: parseBooleanAttribute(this, "transcode"),
      assRenderer: this.getAttribute("ass-renderer") || "auto",
      bitmapSubtitles: parseBooleanAttribute(this, "bitmap-subtitles")
    };
  }
  async load(source) {
    if (this.player) this.player.destroy();
    this.player = createPlayer(this.video, this.getPlayerOptions());
    if (typeof source === "string") {
      const response = await fetch(source);
      if (!response.ok) throw new Error(`Unable to load ${source}: ${response.status}`);
      source = await response.blob();
    }
    return this.player.load(source);
  }
  handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer && event.dataTransfer.files[0];
    if (file) this.load(file);
  }
};
function preventDefault(event) {
  event.preventDefault();
}
function registerMKVPlayerElement() {
  if (typeof customElements === "undefined") return;
  if (!customElements.get("mkv-player")) customElements.define("mkv-player", MKVPlayerElement);
}

// src/browser/index.js
if (typeof customElements !== "undefined") registerMKVPlayerElement();
if (typeof document !== "undefined" && document.querySelector(".file-drop-area") && !document.querySelector("#player-file")) {
  createExtractorUI();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MKVPlayer,
  MSEPlayer,
  OverlayManager,
  attachSubtitleTracks,
  createExtractorUI,
  createPlayer,
  createWorkerClient,
  demux,
  extractAttachments,
  extractCues,
  extractSubtitles,
  getPlaybackSupport,
  hevcCodecString,
  isHevcMseSupported,
  loadFfmpeg,
  registerMKVPlayerElement,
  remuxToMp4,
  resolvePlaybackStrategy,
  transcodeToMp4
});
