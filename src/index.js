const express = require('express')
const cors = require('cors')
const router = require('./router.js')

const app = express()
const port = 666

const path = require('path');
app.use(express.static(path.resolve('../public')))

app.use(cors())
app.use(router)

app.listen(port)
