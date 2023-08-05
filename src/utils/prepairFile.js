const fs = require('fs')
const sharp = require('sharp')

sharp.cache({files: 0})

module.exports = async fileName => {
  const filesPath = `${process.cwd()}/src/files`
  const fileBaseName = fileName.split('.')[0]
  const fileFormat = fileName.slice(++fileBaseName.length)

  const getFilePath = (label = '') => `${filesPath}/${fileBaseName}${label}.${fileFormat}`

  // Resize
  await sharp(getFilePath(), { pages: -1 }) // Pages -1 means to get all frames
    .resize(750)
    .toFile(getFilePath('Resized'))

  const [width, height] = [150, (await sharp(getFilePath('Resized')).metadata()).height]

  const subImagesPath = [1, 2, 3, 4, 5].map(i => getFilePath(i))
  for (let i in subImagesPath) {
    const subImagePath = subImagesPath[i]

    // Crop into five
    await sharp(getFilePath('Resized'), { pages: -1 })
      .extract({ left: 150 * i, top: 0, width, height })
      .toFile(subImagePath)

    // Changes last hex to "21"
    const croppedImageHex = fs.readFileSync(subImagePath).toString('hex')

    const modifiedHex = `${croppedImageHex.slice(0, -2)}21`
    const buffer = Buffer.from(modifiedHex, 'hex')

    fs.writeFileSync(subImagePath, buffer)
  }

  fs.unlinkSync(getFilePath())
  fs.unlinkSync(getFilePath('Resized'))

  return subImagesPath
}