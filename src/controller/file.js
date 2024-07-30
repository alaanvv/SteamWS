const fs = require('fs')
const Zipper = require('adm-zip')
const prepairFile = require('../utils/prepairFile')
const { join } = require('path')

const filesPath = join(process.cwd(), 'tmp')

const postFile = async (req, res) => {
  if (!req.file) return res.status(400).end()

  const fileFormat = req.file.originalname.split('.').pop()
  if (!['gif', 'png', 'jpg', 'jpeg'].includes(fileFormat)) res.status(400).end()

  const fileName = Date.now()
  const filePath = `${filesPath}/${fileName}.${fileFormat}`

  const file = fs.openSync(filePath, 'w')
  fs.writeSync(file, req.file.buffer)
  fs.closeSync(file)

  const files = await prepairFile(`${fileName}.${fileFormat}`)

  const zip = new Zipper()
  files.map(file => zip.addLocalFile(file))
  await zip.writeZipPromise(`${filesPath}/${fileName}.zip`)

  files.map(file => { fs.unlinkSync(file) })

  res.on('finish', e => { fs.unlinkSync(`${filesPath}/${fileName}.zip`) })
  res.download(`${filesPath}/${fileName}.zip`)
}

module.exports = { postFile }
