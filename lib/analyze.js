const fs = require('fs')
const SourceMap = require('source-map')
const path = require('path')

module.exports = function(filename, row, column) {
  const { readFileSync } = fs
  const { SourceMapConsumer } = SourceMap

  const rawSourceMap = JSON.parse(
    readFileSync(path.join(__dirname, '../temp', filename), 'utf8')
  )

  return new Promise((resolve, reject) => {
    SourceMapConsumer.with(rawSourceMap, null, consumer => {
      const pos = consumer.originalPositionFor({
        line: row,
        column: column
      })

      resolve(pos)
    })
  })
}
