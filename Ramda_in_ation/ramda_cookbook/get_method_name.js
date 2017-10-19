const R = require('ramda')
    // curry的应用
var methodNames = R.compose(R.keys, R.pickBy(R.is(Function)))

var obj = {
    foo: true,
    bar: function() {},
    baz: function() {}
}
result = methodNames(obj)
console.log(result)