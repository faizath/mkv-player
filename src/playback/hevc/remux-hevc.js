function bytes (...parts) {
  const output = new Uint8Array(parts.reduce((length, part) => length + part.length, 0))
  let offset = 0
  parts.forEach(part => {
    output.set(part, offset)
    offset += part.length
  })
  return output
}

function u32 (value) {
  const output = new Uint8Array(4)
  new DataView(output.buffer).setUint32(0, value >>> 0)
  return output
}

function u16 (value) {
  const output = new Uint8Array(2)
  new DataView(output.buffer).setUint16(0, value)
  return output
}

function box (type, content) {
  return bytes(u32(content.length + 8), new TextEncoder().encode(type), content)
}

function codecPrivate (track) {
  return track.codecPrivate instanceof Uint8Array
    ? track.codecPrivate
    : new Uint8Array(track.codecPrivate || [])
}

function hevcVisualSampleEntry (track) {
  const width = track.width || 1920
  const height = track.height || 1080
  const compressor = new Uint8Array(32)
  const data = bytes(new Uint8Array(6), u16(1), new Uint8Array(16), u16(width), u16(height),
    u32(0x00480000), u32(0x00480000), new Uint8Array(4), new Uint8Array([0, 0]),
    compressor, u16(0x0018), u16(0xffff), box('hvcC', codecPrivate(track)))
  return box('hvc1', data)
}

function nextStart (data, start) {
  for (let i = start; i + 3 < data.length; i++) {
    if (data[i] === 0 && data[i + 1] === 0 &&
      (data[i + 2] === 1 || (data[i + 2] === 0 && data[i + 3] === 1))) return i
  }
  return data.length
}

function hevcSample (data) {
  const input = data instanceof Uint8Array ? data : new Uint8Array(data)
  const nals = []
  let start = 0
  while (start < input.length) {
    let marker = -1
    for (let i = start; i + 3 < input.length; i++) {
      if (input[i] === 0 && input[i + 1] === 0 &&
        (input[i + 2] === 1 || (input[i + 2] === 0 && input[i + 3] === 1))) {
        marker = i
        break
      }
    }
    if (marker < 0) break
    const nalStart = marker + (input[marker + 2] === 1 ? 3 : 4)
    const nalEnd = nextStart(input, nalStart)
    if (nalEnd > nalStart) nals.push(bytes(u32(nalEnd - nalStart), input.slice(nalStart, nalEnd)))
    start = nalEnd
  }
  return nals.length ? bytes(...nals) : input
}

export { hevcVisualSampleEntry, hevcSample }
