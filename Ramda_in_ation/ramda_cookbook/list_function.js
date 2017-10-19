const R = require('ramda')
    // list :: a... -> [a...]
var list = R.unapply(R.identity)
console.log(list(1, 2, 3))

// R.identity
// 将输入值原样返回。适合用作默认或占位函数。
R.identity(1)
var obj = {}
R.identity(obj) === obj

// R.unapply
/*
输入一个只接收单个数组作为参数的函数，返回一个新函数：

接收任意个参数；
    将参数组成数组传递给 fn ；
    返回执行结果。
    换言之，R.unapply 将一个使用数组作为参数的函数，变为一个不定参函数。 
R.unapply 是 R.apply 的逆函数。

R.apply
将函数fn作用于参数列表args。
apply 可以将变参函数转换为为定参函数。如果上下文很重要，则 fn 应该绑定其上下文。
*/
var nums = [1, 2, 3, -99, 42, 6, 7]
R.apply(Math.max, nums)

R.unapply(JSON.stringify)(1, 2, 3)