const R = require('ramda')
const fs = require('fs')
    // 把里面的函数curry
    // fn
    // keys
    // zipObj 拉链 keys: fn(keys)
    // 两个队列 1对1 zip一个object
const objFromKeys = R.curry((fn, keys) => R.zipObj(keys, R.map(fn, keys)))

const files = ['test1.js', 'get_method_name.js']
    // 将档案抄出来变成一个object
result = objFromKeys(fs.readFileSync, files)
console.log(result)