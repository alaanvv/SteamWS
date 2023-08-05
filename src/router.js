const Router = require('express').Router
const multer = require('multer')
const fileController = require('./controller/file')

const router = new Router()
const upload = multer({limits: {fileSize: 20 * 1024 ** 2}}) // 20MB

router.get('/', (req, res) => res.sendFile(`${process.cwd()}/public/index.html`))
router.post('/file', upload.single('file'), fileController.postFile)

module.exports = router
