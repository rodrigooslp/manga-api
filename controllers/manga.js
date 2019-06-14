const cheerio = require('cheerio')
const rp = require('request-promise-native')

async function load (url) {
  const body = await rp.get(url)
  return cheerio.load(body)
}

async function getImageUrl (pagina, endereco) {
  const $ = await load(`https://www.mangareader.net${endereco}`)
  const url = $('#img')[0].attribs.src

  return { pagina, url }
}

async function download (nome, capitulo) {
  const $main = await load(`https://www.mangareader.net/${nome}`)
  const $page = await load(`https://www.mangareader.net/${nome}/${capitulo}`)

  const totalCapitulos = $main('#latestchapters > ul > li:nth-child(1) > a')
    .text()
    .split(' ')
    .pop()

  const totalPaginas = $page('#selectpage')
    .text()
    .split(' ')
    .pop()

  const links = $page('#pageMenu')
    .children()
    .toArray()
    .map(({ children, attribs }) => {
      const pagina = children.pop().data
      const url = attribs.value

      return getImageUrl(pagina, url)
    })

  const urls = await Promise.all(links)
  return { nome, capitulo, totalCapitulos, totalPaginas, urls }
}

module.exports = {
  download: download
}
