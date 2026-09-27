function hevcCodecString (codecPrivate) {
  const data = codecPrivate instanceof Uint8Array
    ? codecPrivate
    : new Uint8Array(codecPrivate || [])
  if (data.length < 13 || data[0] !== 1) return 'hvc1.1.6.L93.B0'
  const profileSpace = ['', 'A', 'B', 'C'][(data[1] >> 6) & 3]
  const profile = data[1] & 0x1f
  const compatibility = ((data[2] << 24) | (data[3] << 16) | (data[4] << 8) | data[5]) >>> 0
  const compatibilityString = compatibility.toString(16).toUpperCase().replace(/^0+(?=.)/, '')
  const tier = (data[1] & 0x20) ? 'H' : 'L'
  const level = data[12]
  const constraints = Array.from(data.slice(6, 12))
  while (constraints.length && constraints[constraints.length - 1] === 0) constraints.pop()
  const constraintString = constraints.length
    ? `.${constraints.map(byte => byte.toString(16).toUpperCase().padStart(2, '0')).join('')}`
    : ''
  return `hvc1.${profileSpace}${profile}.${compatibilityString}.${tier}${level}${constraintString}`
}

export { hevcCodecString }
