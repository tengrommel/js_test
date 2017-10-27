let fs = require('fs')

// let note = fs.readFileSync('note', 'utf8')
// fs.writeFileSync('writeMe.txt', note)

let note = fs.readFile('note', 'utf8', function (err, data) {
  fs.writeFile('writeMe.txt', data)
})

console.log('test')