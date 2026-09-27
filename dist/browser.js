import {
  MKVPlayer,
  MSEPlayer,
  OverlayManager,
  attachSubtitleTracks,
  attachments_default,
  createPlayer,
  createWorkerClient,
  demuxer_default,
  extractCues,
  extract_default,
  formatDuration,
  getPlaybackSupport,
  hevcCodecString,
  isHevcMseSupported,
  loadFfmpeg,
  remuxToMp4,
  resolvePlaybackStrategy,
  transcodeToMp4
} from "./chunk-BMREOSMW.js";

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
export {
  MKVPlayer,
  MSEPlayer,
  OverlayManager,
  attachSubtitleTracks,
  createExtractorUI,
  createPlayer,
  createWorkerClient,
  demuxer_default as demux,
  attachments_default as extractAttachments,
  extractCues,
  extract_default as extractSubtitles,
  getPlaybackSupport,
  hevcCodecString,
  isHevcMseSupported,
  loadFfmpeg,
  registerMKVPlayerElement,
  remuxToMp4,
  resolvePlaybackStrategy,
  transcodeToMp4
};
