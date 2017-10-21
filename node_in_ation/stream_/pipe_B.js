process.stdin.on("data", function (data) {
    console.log('B.js receive data from A:("', data.toString(), '")')
})
process.stdin.resume()

// process.stdin.pipe(process.stdout)