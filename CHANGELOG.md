# Changelog

## 2.2.0

- Added HEVC fMP4 remux and MSE playback when the browser supports HEVC.
- Added optional ffmpeg.wasm transcode fallback for unsupported codecs.
- Added overlay manager with WebVTT, libass (`akarisub`), and PGS (`libbitsub`) renderers.
- Preserved binary PGS subtitle payloads during demuxing.
- Documented optional peer dependencies and new player options.

## 2.1.0

- Added optional Web Worker demuxing and a worker client/bundle.
- Added blob URL lifecycle management, AbortSignal propagation, and `<mkv-player>`.
- Added the unified player/extractor demo, extract example, and published TypeScript declarations.
- Updated build packaging and documentation.

## 2.0.0

- Added browser playback with Media Source Extensions and MP4 remuxing.
- Added playback support detection, subtitle attachment, and SRT-to-WebVTT conversion.
- Added browser and IIFE builds with player and extractor examples.
