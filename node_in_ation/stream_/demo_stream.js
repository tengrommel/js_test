var fs = require('fs')
var stream
stream = fs.createReadStream('./1')
stream.on("data", function (data) {
    var chunk = data.toString()
    console.log('\n')
    process.stdout.write(chunk)
})

stream.on("end", function () {
    console.log('\n')
})