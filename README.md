# mkv.js

Browser MKV demuxer and player library. The included demo extracts MKV subtitles and
attachments directly in the browser: https://qgustavor.github.io/mkv-extract/

## Usage

Install from npm:

```sh
npm install mkv.js
```

```js
import { demux, extractCues } from 'mkv.js'

const result = await demux(arrayBuffer)
const cues = extractCues(result, 1)
```

## Browser playback

H.264 video and AAC audio can be remuxed without re-encoding and played through
Media Source Extensions:

```js
import { demux, getPlaybackSupport, MSEPlayer } from 'mkv.js'

const result = await demux(file, { collectMediaBlocks: true })
const support = getPlaybackSupport(result.tracks)
if (support.supported) await new MSEPlayer(videoElement).load(result)
```

The supported playback matrix is:

| Track | Matroska codec | MP4/MSE codec |
| --- | --- | --- |
| Video | `V_MPEG4/ISO/AVC` | H.264 (`avc1`) |
| Audio | `A_AAC` | AAC-LC (`mp4a`) |
| Audio | `A_MPEG/L3` | MP3 (`mp4a` compatibility varies) |
| Video | `V_AV1` | Detected, but not remuxed by the MP4 muxer |

Pass `collectMediaBlocks: true` only when playback is needed; the default
remains subtitle-only collection for backward compatibility.

For a browser CDN build:

```html
<script src="https://unpkg.com/mkv.js/mkv.js"></script>
<script>
  mkvjs.demux(arrayBuffer).then(result => console.log(result))
</script>
```

1. Open or drop a MKV file
2. Wait a while...
3. ???
4. Profit!

No downloads or uploads, no extensions, no plugins, no complicated things.
Extract .ASS and .SRT subtitles and also any kind of attachment.

*Build with:*

* [node-ebml](https://github.com/themasch/node-ebml), for MKV parsing;
* [filereader-stream](https://github.com/maxogden/filereader-stream), for streaming files;
* [progress-stream](https://github.com/freeall/progress-stream), for statistics;
* [jszip](https://github.com/Stuk/jszip), because it's simpler downloading one file than a lot of files;
* [filesaver.js](https://github.com/eligrey/FileSaver.js), because it's easy to use;
* [tsup](https://tsup.egoist.dev/), for ESM, CommonJS, and IIFE bundles;
* [gh-pages](https://github.com/tschaub/gh-pages), because it's pratical;
* [standard](https://github.com/feross/standard), why not?

Design based on [this pen](http://codepen.io/prasanjit/pen/NxjZMO)
from [Prasanjit Singh](http://codepen.io/prasanjit/).
