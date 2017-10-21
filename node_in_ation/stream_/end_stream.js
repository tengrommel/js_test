var Stream = require('stream')
var stream = new Stream()
stream.readable = true
stream.on('close', function (data) {
    console.log(data)
})
stream.on('data', function (closedata) {
    console.log(closedata)
})
stream.emit("data", 'data flag')
stream.emit("close", 'close flag')