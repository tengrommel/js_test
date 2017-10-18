/*
简单组合
一旦熟悉了可以将函数传递给其他函数，你可能会开始找将多个函数组合在一起的场景。
Ramda 为简单的函数组合提供了一些函数
*/
const R = require('ramda');
// Complement
const isEven = x => x % 2 === 0
console.log(R.find(isEven, [1, 2, 3, 4]))
    // 问题我们要找首个奇数

/*
Ramda 提供了一个更高阶的函数：complement，给它传入一个函数，返回一个新的函数：
当原函数返回 "假值" 时，新函数返回 true；原函数返回 "真值" 时，新函数返回 false，
即新函数是原函数的补函数
*/
const isEven_ramda = x => x % 2 === 0
console.log(R.find(R.complement(isEven), [1, 2, 3, 4]))
    // 函数复用
const isOdd = R.complement(isEven_ramda)
console.log(R.find(isOdd, [1, 2, 3, 4]))
    // 注意，complement 以函数的方式实现了逻辑非操作（!， not）的功能。