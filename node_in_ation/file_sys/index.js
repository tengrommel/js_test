console.log(__filename)
console.log(__dirname)
console.log(process.cwd())
// 切换工作目录
// process.chdir('/')
// console.log(process.cwd())
var path = require('path')
var filename = "/foo/bar.baz.txt"
var extension = path.extname(filename)
console.log(extension)

var fs = require('fs')
var path = __dirname + "/inddex.js"
var existsSync = fs.exists(path, function (exists) {
    console.log(exists)
})

fs.stat('./index.js', function (errors, data) {
    console.log(data)
})