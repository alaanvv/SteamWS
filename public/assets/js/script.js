const form = document.querySelector('form')
const loading = document.querySelector('.loading')

form.onsubmit = e => {
  e.preventDefault()

  form.enctype = 'multipart/form-data'
  const formData = new FormData(form)

  loading.style.display = 'inline'

  fetch('/file', {
    method: 'POST',
    body: formData
  })
    .then(res => res.blob())
    .then(data => {
      const file = new Blob([data], { type: 'application/octet-stream' })
      const fileURL = window.URL.createObjectURL(file)
      
      const anchor = document.createElement('a')
      anchor.href = fileURL
      anchor.download = 'steam-ws.zip'
      
      anchor.click()
      
      anchor.remove()
      window.URL.revokeObjectURL(fileURL)
      loading.style.display = 'none'
    })
}
