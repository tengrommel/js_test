// Pipes
var Stream = require("stream")
var stream = new Stream()
var bytes = 0
stream.writable = true
stream.write = function (buffer) {
    bytes += buffer.length
}
stream.end = function (buffer) {
    if (buffer) {
        stream.write(buffer)
    }
    stream.writable = false
    stream.emit("finish")
    console.log(bytes + " bytes written")
}

stream.pipe(stream)
stream.emit("data", new Buffer("foo"))
stream.emit("end")