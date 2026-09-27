# mkv.js

mkv.js is a browser-first Matroska (MKV/WebM) demuxer, extractor, and player. It
parses files locally, extracts subtitles and attachments, and plays compatible
tracks through Media Source Extensions without re-encoding when possible.

## Support

| Content | Matroska codecs | Playback |
| --- | --- | --- |
| Video | H.264 (`V_MPEG4/ISO/AVC`) | Yes, MP4/MSE |
| Video | HEVC (`V_MPEGH/ISO/HEVC`) | Yes when browser MSE supports HEVC |
| Audio | AAC (`A_AAC`) | Yes, MP4/MSE |
| Audio | MP3 (`A_MPEG/L3`) | Browser-dependent |
| Subtitles | SRT/UTF-8 | WebVTT `<track>` |
| Subtitles | ASS/SSA | libass overlay via optional `akarisub`; text WebVTT fallback |
| Subtitles | PGS (`S_HDMV/PGS`) | Bitmap overlay via optional `libbitsub` |

Other codecs can be inspected or extracted where the demuxer supports them.
Enable ffmpeg.wasm transcode for unsupported audio/video when remuxing is not enough.

## Installation

```sh
npm install mkv.js
```

Optional peer dependencies:

```sh
npm install @ffmpeg/ffmpeg @ffmpeg/util   # transcode fallback
npm install akarisub                      # styled ASS subtitles
npm install libbitsub                     # PGS/bitmap subtitles
```

```js
import { demux, extractCues, createPlayer } from 'mkv.js'

const result = await demux(arrayBuffer)
const cues = extractCues(result, 1)

const player = createPlayer(document.querySelector('video'), {
  transcode: 'auto',
  assRenderer: 'auto',
  bitmapSubtitles: true
})
await player.load(file)
```

For a browser CDN build:

```html
<script src="https://unpkg.com/mkv.js/mkv.js"></script>
<script>
  const player = mkvjs.createPlayer(document.querySelector('video'), {
    assRenderer: 'text'
  })
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
- `resolvePlaybackStrategy(tracks, options)` chooses remux, HEVC remux, or transcode.
- `getPlaybackSupport(tracks)` reports whether tracks can be remuxed and played.
- `remuxToMp4(result)` returns a `{ blob, mimeType }` MP4.
- `transcodeToMp4(input, options)` transcodes an MKV to MP4 with ffmpeg.wasm.
- `OverlayManager` attaches WebVTT, libass, or PGS subtitle renderers.

### Player options

| Option | Values | Default | Description |
| --- | --- | --- | --- |
| `transcode` | `false`, `true`, `'auto'` | `false` | ffmpeg.wasm fallback |
| `assRenderer` | `'text'`, `'libass'`, `'auto'` | `'auto'` | ASS rendering mode |
| `bitmapSubtitles` | `boolean`, `'auto'` | `'auto'` | PGS/VobSub overlay |
| `subtitleTrack` | track number | all visible | Active subtitle track |
| `overlay.assWorkerUrl` | URL | package default | akarisub worker override |
| `overlay.pgsWorkerUrl` | URL | package default | libbitsub worker override |

### Transcode fallback

Transcoding is opt-in because ffmpeg.wasm is substantially slower and more
resource-intensive than remuxing. Install `@ffmpeg/ffmpeg` and `@ffmpeg/util`,
then use `createPlayer(video, { transcode: true })` or `transcode: 'auto'` to
attempt transcoding only after remux/MSE fails. Packages are lazy-loaded and are
not included in the main bundle. The default single-thread core requires no
COOP/COEP headers; multi-thread cores need cross-origin isolation.

The browser entry also exports `createWorkerClient()` and
`registerMKVPlayerElement()`. The custom element supports:

```html
<mkv-player use-worker transcode="auto" ass-renderer="auto" bitmap-subtitles></mkv-player>
```

## Browser and Node

Use `mkv.js/browser` for browser playback, the worker client, and the custom
element. The main `mkv.js` entry contains demuxing, extraction, and remuxing
APIs and can be used in Node where the source is a compatible readable stream
or `ArrayBuffer`. MSE, DOM subtitle tracks, and Web Workers require a browser.

## Development

```sh
npm test
npm run build
```

The project is MIT licensed.
