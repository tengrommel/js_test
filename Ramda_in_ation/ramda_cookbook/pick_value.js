const R = require('ramda')
    // Pick values a from list by indexes
    // :: [Number] -> [a] -> [a]
var pickIndexes = R.compose(R.values, R.pickAll)
let result = pickIndexes([0, 2], ['a', 'b', 'c'])
console.log(result)

// R.values
let one_result = R.values({ a: 1, b: 2, c: 3 })
console.log(one_result)

// R.pickAll
// let two_result = R.pickAll(['a', 'd', 'e'], { a: 1, b: 2, c: 3, d: 4 })
let two_result = R.pick(['a', 'd', 'e'], { a: 1, b: 2, c: 3, d: 4 })
console.log(two_result)