function blockPayload (block) {
  if (block.data instanceof Uint8Array) return block.data
  if (typeof block.data === 'string') return new TextEncoder().encode(block.data)
  return new Uint8Array(0)
}

function blocksToPgsBuffer (blocks) {
  const parts = (blocks || []).map(blockPayload)
  const total = parts.reduce((sum, part) => sum + part.length, 0)
  const output = new Uint8Array(total)
  let offset = 0
  parts.forEach(part => {
    output.set(part, offset)
    offset += part.length
  })
  return output.buffer
}

export { blocksToPgsBuffer, blockPayload }
