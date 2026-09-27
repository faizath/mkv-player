import ebml from 'ebml'

function createDecoder () {
  return new ebml.Decoder()
}

function readVint (data) {
  return ebml.tools.readVint(data)
}

export { createDecoder, readVint }
