var fs = require('fs')
// 删除文件
// fs.unlink('writeMe.txt')
fs.mkdirSync('stuff')
fs.rmdirSync('stuff')

fs.mkdir('stuff', function () {
  fs.readFile('note', 'utf8', function(err, data){
    fs.writeFile('./stuff/writeMe.txt', data)
  })
})
