const express = require('express')
const cors = require('cors')
const router = require('./router.js')
const { join } = require('path')

const app = express()
const port = 666

app.use(express.static(join(process.cwd(), 'public')))

app.use(cors())
app.use(router)

app.listen(port)
