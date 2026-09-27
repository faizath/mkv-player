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
  createExtractorUI: () => createExtractorUI,
  demux: () => demuxer_default,
  extractAttachments: () => attachments_default,
  extractCues: () => extractCues,
  extractSubtitles: () => extract_default
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
      if (track.type === TRACK_TYPES.SUBTITLE) result.blocksByTrack.set(track.number, []);
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
    state.lastBlock.duration = toMilliseconds(numberValue(value), state.timecodeScale);
  }
  if (name === "SimpleBlock" || name === "Block") addBlock(value, result, state);
}
function addBlock(data, result, state) {
  const trackVint = readVint(data);
  const trackNumber = trackVint.value;
  if (!state.trackByNumber[trackNumber] || state.trackByNumber[trackNumber].type !== TRACK_TYPES.SUBTITLE) return;
  const bytes = new Uint8Array(data);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const relativeTimecode = view.getInt16(trackVint.length);
  const flags = bytes[trackVint.length + 2];
  const payload = data.slice(trackVint.length + 3);
  const block = {
    trackNumber,
    timecode: toMilliseconds(state.clusterTimecode + relativeTimecode, state.timecodeScale),
    duration: 0,
    data: Buffer.from(payload).toString("utf8"),
    keyframe: Boolean(flags & 128)
  };
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
function assDialogue(cue, codecPrivate, data) {
  const fields = data.split(",");
  const format = assFormat(codecPrivate);
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
function assText(data, codecPrivate) {
  const fields = data.split(",");
  const format = assFormat(codecPrivate);
  const textIndex = format.indexOf("text");
  return textIndex === -1 ? fields[fields.length - 1] : fields.slice(textIndex).join(",");
}
function assFormat(codecPrivate) {
  const match = bufferToString(codecPrivate).match(/^\s*Format:\s*([^\r\n]*)/im);
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

// src/browser/index.js
if (typeof document !== "undefined" && document.querySelector(".file-drop-area")) {
  createExtractorUI();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createExtractorUI,
  demux,
  extractAttachments,
  extractCues,
  extractSubtitles
});
