const Stream = require('stream')

const duplexStream = Stream.Duplex()

duplexStream._read = function () {
  this.push('read1');
  this.push('read2');
  this.push('read3');
  this.push('read4')
  this.push(null);
}

duplexStream._write = function (data, enc, next) {
  console.log(data.toString());
  next();
}

duplexStream.on('data', (data) => {

  console.log(data.toString())
});
duplexStream.on('end', data => console.log('read done~'));

duplexStream.write('write1');
duplexStream.write('write2');
duplexStream.write('write3');
duplexStream.write('write4');
duplexStream.end();

duplexStream.on('finish', data => console.log('write done~'));