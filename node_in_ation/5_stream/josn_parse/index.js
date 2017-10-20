// 一个JSON行解析器
var stream = require('stream')
var util = require('util')
var fs = require('fs')

function JSONLineReader(source) {
    stream.Readable.call(this)
    this._source = source
    this._foundLineEnd = false
    this._buffer = ''

    source.on('readable', function () {
        this.read()
    }.bind(this))
}

util.inherits(JSONLineReader, stream.Readable)

JSONLineReader.prototype._read = function(size) {
    var chunk
    var line
    var lineIndex
    var result

    if(this._buffer.length === 0) {
        chunk = this._source.read()
        this._buffer += chunk
    }

    lineIndex = this._buffer.indexOf('n')
    if (lineIndex !== -1) {
        line = this._buffer.slice(0, lineIndex + 1)
        this._buffer = this._buffer.slice(lineIndex+1)
        this.emit('object', result)
        this.push(util.inspect(result))
    } else {
        this._buffer = this._buffer.slice(1)
    }
}