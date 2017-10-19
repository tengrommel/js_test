const R = require('ramda')
const whereAll = R.curry((spec, obj) => {
    let output = true
    if (typeof obj === 'undefined') { // 如果传入物件是undefined
        if (spec === null || typeof spec === 'boolean')
            return !spec
    } else if (spec === false)
        return false
    R.forEachObjIndexed((v, k) => {
        if (v === null || typeof v === 'boolean' || R.keys(v).length) {
            output = false
        } else if (!v(obj[k]))
            output = false
    }, spec)
    return output
})