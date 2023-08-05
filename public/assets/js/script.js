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
      const anchor = document.createElement('a')
      anchor.href = window.URL.createObjectURL(data)

      loading.style.display = 'none'
      anchor.click()
      anchor.remove()
    })
}
