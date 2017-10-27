let pi = 3.14

let counter = function(arr) {
  return 'There are ' + arr.length + ' elements in the array'
}

module.exports.adder = function (a, b) {
  return `The sum of the 2 number is ${a+b}`
}

module.exports = {
  counter: counter,
  pi: pi
}