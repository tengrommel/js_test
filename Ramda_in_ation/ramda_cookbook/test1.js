const R = require('ramda')
const a = R.map(R.call, R.repeat(Math.random, 5));

// Set properties only if they don't exist

var defaults = R.flip(R.merge);

const a_R = defaults({}, {
    SECRET: 'deadeef'
});

console.log(a_R)