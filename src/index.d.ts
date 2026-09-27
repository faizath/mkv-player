export interface Track {
  number: number
  type: number
  codecId: string
  codecPrivate?: Uint8Array | string
  language?: string
  name?: string
  default?: boolean
  width?: number
  height?: number
}

export interface Block {
  trackNumber: number
  timecode: number
  duration: number
  data: Uint8Array | string
  keyframe: boolean
  isBinary?: boolean
  durationMs?: number
  blockTimestamp?: number
}

export interface DemuxResult {
  info: Record<string, unknown>
  tracks: Track[]
  attachments: Array<{ name: string, mimeType: string, data: Uint8Array }>
  blocksByTrack: Map<number, Block[]>
}

export interface DemuxOptions {
  collectMediaBlocks?: boolean
  transcode?: boolean | 'auto'
  signal?: AbortSignal
  onProgress?: (percentage: number, eta: number) => void
}

export type ReadableSource = { pipe: (...args: unknown[]) => unknown }
export function demux(source: ArrayBuffer | Blob | ReadableStream | ReadableSource, options?: DemuxOptions): Promise<DemuxResult>
export function extractCues(result: DemuxResult, trackNumber?: number): Array<Record<string, unknown>>
export function extractSubtitles(result: DemuxResult): Array<Record<string, unknown>>
export function extractAttachments(result: DemuxResult): Array<Record<string, unknown>>
export function getPlaybackSupport(tracks: Track[]): { supported: boolean, reason?: string, videoTrack?: Track, audioTrack?: Track }
export type PlaybackStrategyName = 'remux-mse' | 'remux-hevc' | 'transcode' | 'unsupported'
export interface PlaybackStrategy {
  strategy: PlaybackStrategyName
  supported: boolean
  reason?: string
  videoTrack?: Track
  audioTrack?: Track
  codecs?: string[]
}
export type AssRendererMode = 'text' | 'libass' | 'auto'
export type BitmapSubtitleMode = boolean | 'auto'
export interface OverlayAssetOptions {
  assWorkerUrl?: string
  assWasmUrl?: string
  pgsWorkerUrl?: string
}

export interface MKVPlayerOptions extends DemuxOptions {
  assRenderer?: AssRendererMode
  bitmapSubtitles?: BitmapSubtitleMode
  subtitleTrack?: number
  overlay?: OverlayAssetOptions
}
export function resolvePlaybackStrategy(tracks: Track[], options?: { transcode?: boolean | 'auto' }): PlaybackStrategy
export function remuxToMp4(result: DemuxResult, options?: Record<string, unknown>): Promise<{ blob: Blob, mimeType: string }>
export interface TranscodeOptions {
  coreURL?: string
  wasmURL?: string
  preset?: string
  onProgress?: (percentage: number, phase: string) => void
}
export function loadFfmpeg(options?: TranscodeOptions): Promise<unknown>
export function transcodeToMp4(input: Blob | File | ArrayBuffer | Uint8Array, options?: TranscodeOptions): Promise<{ blob: Blob, mimeType: string }>

export class MSEPlayer {
  constructor(video: HTMLVideoElement, options?: Record<string, unknown>)
  load(result: DemuxResult, options?: { signal?: AbortSignal }): Promise<this>
  destroy(): void
}

export class OverlayManager {
  constructor(video: HTMLVideoElement, options?: MKVPlayerOptions & Record<string, unknown>)
  attachFromDemux(result: DemuxResult, options?: MKVPlayerOptions & Record<string, unknown>): Promise<this>
  setActiveTrack(trackNumber?: number): void
  setVisible(visible: boolean): void
  destroy(): void
}

export class MKVPlayer {
  load(source: ArrayBuffer | Blob, options?: MKVPlayerOptions): Promise<this>
  getTracks(): { video: Track[], audio: Track[], subtitles: Track[] }
  downloadMp4(): Promise<Blob>
}

export function createPlayer(video: HTMLVideoElement, options?: MKVPlayerOptions & Record<string, unknown>): MKVPlayer
