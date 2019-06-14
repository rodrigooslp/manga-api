var express = require('express')
var router = express.Router()

var MangaController = require('../controllers/manga')

router.get('/', async function (req, res) {
  const { nome, capitulo } = req.query
  const result = await MangaController.download(nome, capitulo)
  res.send(result)
})

module.exports = router
