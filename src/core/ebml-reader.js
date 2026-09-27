const ebml = require('ebml')

function createDecoder () {
  return new ebml.Decoder()
}

function readVint (data) {
  return ebml.tools.readVint(data)
}

module.exports = { createDecoder, readVint }
