var Stream = require("stream")
var stream = new Stream()
var duration = 5 * 1000
var end = Date.now() + duration
var interval 
stream.readable = true
stream.on('end', function (inputdata) {
    console.log(inputdata.toString())
})

interval = setInterval(function () {
    var now = Date.now()
    console.log("Emitting a data event")
    stream.emit('data', new Buffer('foo.txt'))
    if (now >= end) {
        stream.emit("end", "Emitting an en event")
        clearInterval(interval)
    }
}, 1000)