const R = require('ramda')

const mapKeys = R.curry((fn, obj) =>
    R.fromPairs(
        R.map(R.adjust(fn, 0), R.toPairs(obj))
    ));

mapKeys(R.toUpper, { a: 1, b: 2, c: 3 });