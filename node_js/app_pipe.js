const http = require('http')
const fs = require('fs')

const myReadStream = fs.createReadStream(__dirname + '/note', 'utf8')
const myWriteStream = fs.createWriteStream(__dirname + '/pipenote')

myReadStream.pipe(myWriteStream)