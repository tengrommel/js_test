console.log('het ninjas')

setTimeout(function() {
    console.log('3 seconds have passed')
}, 3000)

let time = 0

let timer = setInterval(function() {
    time += 2
    console.log(time + ' seconds have passed')
    if (time > 9) {
        clearInterval(timer)
    }
}, 4000)

console.log(__dirname)
console.log(__filename)

// require exports