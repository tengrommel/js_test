var Stream = require("stream")
var stream = new Stream();
stream.readable = true
stream.on('data', function (inputdata) {
    console.log(inputdata.toString())
})
stream.emit("data", new Buffer("note"))
stream.emit("data", new Buffer("note"))