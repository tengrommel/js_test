var Stream = require("stream")
var stream = new Stream()
stream.readable = true
stream.on('data', function (closedata) {
    console.log(closedata)
})
stream.on('error', function (closedata) {
    console.log(closedata)
})
stream.emit("error", new Error("Something went wrong!"))
stream.emit("data", 'flag')