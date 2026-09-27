function formatTimestamp (timestamp) {
  const seconds = timestamp / 1000
  const hh = Math.floor(seconds / 3600)
  let mm = Math.floor((seconds - (hh * 3600)) / 60)
  let ss = (seconds - (hh * 3600) - (mm * 60)).toFixed(2)
  if (mm < 10) mm = `0${mm}`
  if (ss < 10) ss = `0${ss}`
  return `${hh}:${mm}:${ss}`
}

function formatTimestampSRT (timestamp) {
  const seconds = timestamp / 1000
  let hh = Math.floor(seconds / 3600)
  let mm = Math.floor((seconds - (hh * 3600)) / 60)
  let ss = (seconds - (hh * 3600) - (mm * 60)).toFixed(3)
  if (hh < 10) hh = `0${hh}`
  if (mm < 10) mm = `0${mm}`
  if (ss < 10) ss = `0${ss}`
  return `${hh}:${mm}:${ss}`
}

function formatDuration (duration) {
  duration = Math.round(duration)
  if (duration < 2) return 'few seconds'
  if (duration < 58) return duration + ' seconds'
  if (duration < 120) return '1 minute'
  if (duration < 3598) return Math.floor(duration / 60) + ' minutes'
  if (duration < 7200) return '2 hours'
  return Math.floor(duration / 3600) + ' hours'
}

export { formatTimestamp, formatTimestampSRT, formatDuration }
