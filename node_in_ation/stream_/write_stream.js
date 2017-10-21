// write
// end
var Stream = require("stream")
var stream = new Stream()
var bytes = 0
stream.writable = true
stream.write = function (buffer) {
    if(buffer) {
        stream.write(buffer)
    }
    stream.writable = false
    stream.emit('finish')
    console.log(bytes + " bytes written")
}