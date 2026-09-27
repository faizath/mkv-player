function exportZip (files, filename, JSZip, saveAs) {
  const zip = new JSZip()
  files.forEach(file => {
    const folder = file.folder ? zip.folder(file.folder) : zip
    folder.file(file.name, file.data)
  })
  return zip.generateAsync({ type: 'blob' }).then(content => saveAs(content, filename))
}

module.exports = exportZip
