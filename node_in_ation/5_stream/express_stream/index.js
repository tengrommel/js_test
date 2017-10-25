var stream = require('stream') // 流
var util = require('util')
var express = require('express')
var app = express()

// 继承
util.inherits(StatStream, stream.Readable)

// 将方法注入 子类
function StatStream(limit) {
    stream.Readable.call(this)
    this.limit = limit
}

// 重写函数
StatStream.prototype._read = function(size) {
    if (this.limit == 0) {
        // Done
        this.push();
    } else {
        this.push(util.inspect(process.memoryUsage()))
        this.push('n')
        this.limit--
    }
}

app.get('/', function(req, res) {
    var statStream = new StatStream(10)
    statStream.pipe(res)
})

app.listen(3000)