const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')
const analyze = require('../lib/analyze')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'SourceMap Parse'
  })
})

router.post('/api/upload', async (ctx) => {
  const file = ctx.request.files.sourcemap
  fs.createReadStream(file.path)
    .pipe(fs.createWriteStream(path.join(__dirname, '../temp', file.name)))


  ctx.body = {
    success: true,
    msg: 'ok'
  }
})

router.get('/api/analyze', async ctx => {
  const params = querystring.parse(ctx.querystring)
  const { filename, row, column } = params
  const pos = await analyze(filename, Number(row), Number(column))

  ctx.body = {
    success: true,
    data: pos
  }
})

module.exports = router
