const express = require('express')
const router = express.Router()

const download = require('./download')

router.use('/download', download)

module.exports = router
