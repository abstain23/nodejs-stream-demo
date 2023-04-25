const Stream = require('stream')

const readableStream = Stream.Readable()

readableStream._read = function() {
  this.push("1")
  this.push("2")
  this.push(null)
}

readableStream.on('data', (data) => {
  console.log('data',data.toString())
})

readableStream.on('end', () => {
  console.log('done ~~')
})


class ReadableStream extends Stream.Readable {
  constructor() {
    super()
  }

  _read() {
    this.push("1222")
    this.push("23333")
    this.push(null)
  }
}

const re1 = new ReadableStream()

re1.on('data', data => {
  console.log('data 2 =>',data.toString())
})
re1.on('close', () => {
  console.log('done2~~~~')
})

// 迭代器版本
class ReadableStream2 extends Stream.Readable {
  constructor(iterator) {
    super()
    this.iterator = iterator
  }

  _read() {
    const next = this.iterator.next()
    if(next.done) {
      return this.push(null)
    } else {
      this.push(next.value)
    }
  }
}

function *songGenerator() {
  yield '阿门阿前一棵葡萄树，';
  yield '阿东阿东绿的刚发芽，';
  yield '阿东背着那重重的的壳呀，';
  yield '一步一步地往上爬。';
}

const songIterator = songGenerator();

const re2 = new ReadableStream2(songIterator)

re2.on('data', data => {
  console.log('data 333 =>',data.toString())
})
re2.on('close', () => {
  console.log('done3~~~~')
})