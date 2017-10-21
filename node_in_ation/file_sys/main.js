var fs = require('fs')
var path = __dirname + "/inde.js"
fs.stat(path, "r", function (error, stats) {
    fs.open(path, "r", function (error, fd) {
        var buffer = new Buffer(state.size)
        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer){
            var data = buffer.toString("utf-8")
            console.log(data)
        })
    })
    
})