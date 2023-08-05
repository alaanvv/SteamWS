const express = require('express')
const cors = require('cors')
const router = require('./router.js')
const { resolve } = require('path')

const app = express()
const port = 666

app.use(express.static(`${process.cwd()}/public`))

app.use(cors())
app.use(router)

app.listen(port)
