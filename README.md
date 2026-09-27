# mkv.js

mkv.js is a browser-first Matroska (MKV/WebM) demuxer, extractor, and player. It
parses files locally, extracts subtitles and attachments, and plays compatible
H.264/AAC tracks through Media Source Extensions without re-encoding.

## Support

| Content | Matroska codecs | Playback |
| --- | --- | --- |
| Video | H.264 (`V_MPEG4/ISO/AVC`) | Yes, MP4/MSE |
| Audio | AAC (`A_AAC`) | Yes, MP4/MSE |
| Audio | MP3 (`A_MPEG/L3`) | Browser-dependent |
| Subtitles | SRT/UTF-8, ASS | WebVTT; ASS styling is text-only |

HEVC, PGS/image subtitles, and other codecs can still be inspected or extracted
where the demuxer supports their tracks, but are not playable by the MP4 muxer.

## Installation

```sh
npm install mkv.js
```

```js
import { demux, extractCues } from 'mkv.js'
const result = await demux(arrayBuffer)
const cues = extractCues(result, 1)
```

For a browser CDN build:

```html
<script src="https://unpkg.com/mkv.js/mkv.js"></script>
<script>
  const player = mkvjs.createPlayer(document.querySelector('video'))
  player.load(fileInput.files[0])
</script>
```

The live demo is in `dist/index.html`; it provides Player and Extract tabs.

## API

- `demux(source, options)` returns `{ info, tracks, attachments, blocksByTrack }`.
  Sources are `ArrayBuffer`, `Blob`/`File`, Web Streams, or Node readable
  streams. Set `collectMediaBlocks: true` for playback. `signal` and
  `onProgress` are supported.
- `extractCues(result, trackNumber)` and `extractSubtitles(result)` extract
  subtitle cues and files.
- `extractAttachments(result)` returns embedded attachment files.
- `createPlayer(video, options)` creates an `MKVPlayer`. Call `load(file)` and
  `destroy()`. `useWorker: true` moves demuxing off the main thread.
- `getPlaybackSupport(tracks)` reports whether tracks can be remuxed and played.
- `remuxToMp4(result)` returns a `{ blob, mimeType }` MP4.
- `MSEPlayer` can load an existing demux result directly.

### Transcode fallback

Transcoding is opt-in because ffmpeg.wasm is substantially slower and more
resource-intensive than remuxing. Install the optional peer dependencies:

```sh
npm install @ffmpeg/ffmpeg @ffmpeg/util
```

Then enable it with `createPlayer(video, { transcode: true })`. Use
`transcode: 'auto'` to try transcoding only after the normal MSE/remux path
fails. The ffmpeg packages are lazy-loaded and are not included in the main
bundle. The default single-thread core requires no COOP/COEP headers; an
optional multi-thread core can be configured with `coreURL`/`wasmURL` and
requires COOP/COEP isolation.

The browser entry also exports `createWorkerClient()` and
`registerMKVPlayerElement()`. The custom element can be used as
`<mkv-player src="file.mkv"></mkv-player>` or assigned a `File` through its
`file` property.

## Browser and Node

Use `mkv.js/browser` for browser playback, the worker client, and the custom
element. The main `mkv.js` entry contains demuxing, extraction, and remuxing
APIs and can be used in Node where the source is a compatible readable stream
or `ArrayBuffer`. MSE, DOM subtitle tracks, and Web Workers require a browser.

## Limitations and roadmap

PGS/image subtitle playback and ASS styling remain unsupported. ffmpeg.wasm
transcoding is optional and intentionally not bundled.

## Development

```sh
npm test
npm run build
```

The project is MIT licensed.
