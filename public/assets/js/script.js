const button  = document.querySelector('input[type=submit]')
const form    = document.querySelector('form')

form.onsubmit = async e => {
  e.preventDefault()

  button.disabled = true

  const res = await fetch('/file', { method: 'POST', body: new FormData(form) })
  const data = await res.blob()
  const file = new Blob([data], { type: 'application/octet-stream' })
  const url = window.URL.createObjectURL(file)

  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'steam-ws.zip'

  anchor.click()
  anchor.remove()
  window.URL.revokeObjectURL(url)
  button.disabled = false
}
