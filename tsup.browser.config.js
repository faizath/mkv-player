export default {
  external: ['@ffmpeg/ffmpeg', '@ffmpeg/util', 'akarisub', 'libbitsub'],
  esbuildOptions (options) {
    options.platform = 'browser'
    options.alias = {
      ...options.alias,
      stream: 'stream-browserify',
      'node:stream': 'stream-browserify',
      events: 'events',
      util: 'util',
      tty: 'tty-browserify',
      buffer: 'buffer',
      process: 'process'
    }
  }
}
