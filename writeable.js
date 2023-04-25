const Stream = require('stream')

const writeableStream = Stream.Writable()

writeableStream._write = function(data, enc, next) {
  console.log(data.toString())
  // setTimeout(() => {
  //   next() // 一秒写一次
  // }, 1000)
  next()
}

writeableStream.on('finish', () => {
  console.log('done~')
})

writeableStream.write('1')
writeableStream.write('2')
writeableStream.write('3')
writeableStream.write('4')
writeableStream.end()


class WriteableStream extends Stream.Writable {
  constructor() {
    super()
  }

  _write(data, enc, next) {
    console.log('11=>', data.toString())
    next()
  }

  writeFormat(data) {
    this.write(data)
  }
}

const w1 = new WriteableStream()

w1.on('finish', () => {
  console.log('done~')
})

w1.writeFormat('1')
w1.writeFormat('12')
w1.end()