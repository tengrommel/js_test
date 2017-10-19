const R = require('ramda')
    // 读取数组元素
    /*
    展示了许多读取对象属性的 Ramda 函数，包括 prop、pick 和 has。Ramda 有更多的方法来读取数组的元素。
    数组中与 prop 类似的是 nth；与 pick 类似的是 slice，跟 has 类似的是 contains。
    */

const numbers = [10, 20, 30, 40, 50, 60]
R.nth(3, numbers)
R.nth(-2, numbers)
R.slice(2, 5, numbers)
R.contains(20, numbers)

// slice 接受两个索引，返回从第 1 个索引开始（以 0 为起始）到第 2 个索引结束（不包含）的所有元素组成的子数组。

/*
经常会访问首个（nth(0)）和最后一个（nth(-1)）元素，
所以 Ramda 为这两种特殊情形提供的便捷方法：head 和 last。
还提供了访问除首个元素之外的所有元素的函数：tail，
除最后一个元素之外的所有元素的方法：init，
前 N 个元素：take(N)，后 N 个元素：takeLast(N)。来看看这些函数的实例。
*/

const numbers_ramda = [10, 20, 30, 40, 50, 60]
R.head(numbers)
R.tail(numbers)
R.last(nubmers)
R.init(numbers)
R.take(3, numbers)
R.takeLast(3, numbers)