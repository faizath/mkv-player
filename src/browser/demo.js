/* global JSZip, saveAs */
const { demux, extractSubtitles, extractAttachments } = require('../index')
const exportZip = require('../extract/zip-export')
const { formatDuration } = require('../subtitles/format')

const input = document.querySelector('input')
const droparea = document.querySelector('.file-drop-area')
const statusEl = document.querySelector('.file-msg')

input.addEventListener('change', handleFiles)
;['dragenter', 'focus', 'click'].forEach(event => input.addEventListener(event, () => {
  droparea.classList.add('is-active')
}))
;['dragleave', 'blur', 'drop'].forEach(event => input.addEventListener(event, () => {
  droparea.classList.remove('is-active')
}))

function handleFiles (event) {
  const files = Array.from(event.target.files)
  statusEl.textContent = `Loading ${files.length} ${files.length === 1 ? 'file' : 'files'}...`
  const loadedData = []
  let errors = 0

  processFile(0)

  function processFile (index) {
    if (!files[index]) return packData()
    const file = files[index]
    demux(file, {
      onProgress: (percentage, eta) => {
        statusEl.textContent = 'Loading file ' + (index + 1) + ' / ' + files.length + ': ' +
          percentage.toFixed(2) + '% (' + formatDuration(eta) + ' remaining)'
      }
    }).then(result => {
      loadedData.push({
        filename: file.name,
        data: extractSubtitles(result).concat(extractAttachments(result))
      })
      processFile(index + 1)
    }).catch(() => {
      errors++
      processFile(index + 1)
    })
  }

  function packData () {
    statusEl.textContent = `${loadedData.length} ${loadedData.length === 1 ? 'file' : 'files'} extracted - ${errors} failed`
    if (loadedData.length === 0) return
    const entries = []
    let filename
    if (loadedData.length === 1) {
      filename = loadedData[0].filename + '_tracks.zip'
      loadedData[0].data.forEach(entry => entries.push(entry))
    } else {
      filename = `${Date.now().toString(36)}_tracks.zip`
      loadedData.forEach(file => file.data.forEach(entry => {
        entries.push({ name: entry.name, data: entry.data, folder: file.filename })
      }))
    }
    exportZip(entries, filename, JSZip, saveAs)
  }
}
