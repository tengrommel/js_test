// Ramda的引入
const R = require('ramda');

function double(x) {
    return x * 2
}
const double_ex6 = x => x * 2

/*
将函数视为第一公民：
    1、使用变量或常量引用函数
    2、将函数作为参数传递给其他函数
    3、将函数作为其他函数的返回值
纯函数
    在进行函数式编程时，使用所谓的 "纯" 函数进行工作将变得非常重要。
    纯函数是没有副作用的函数。它不会给任何外部变量赋值，不会获取输入，不会产生 "输出"，不会对数据库进行读写，不会修改输入参数等。
    纯函数的基本思想是：相同的输入，永远会得到相同的输出。
    当然可以用非纯函数编程（而且这也是必须的，如果想让程序做任何有趣的事情），但在大多数情况下，需要保持大部分函数是纯函数。
    （译者注：并不是说，要禁止使用一切副作用，而是说，要让它们在可控的范围内发生）
IMMUTABILITY
    函数式编程的另一个重要概念是 "Immutability"。什么意思呢？"Immutability" 是指 "数据不变性"。
    当以 immutable 方式工作时，一旦定义了某个值或对象，以后就再也不会改变它了。这意味着不能更改已有数组中的元素或对象中的属性。
    如果想改变数组或对象中的元素时，需要返回一份带有更改值的新拷贝。
    Immutability 和 纯函数息息相关。由于纯函数不允许有副作用，所以不允许更改函数体外部的数据结构。纯函数强制以 immutable 的方式处理数据。
起点
    开始以函数式思维思考最简单的方式是，使用集合迭代函数替代循环。
    注意，所有这些函数 Array.prototype 都有（除了 reject）。因此不需要 Ramda 也可以使用它们。
    但是，为了保持和本系列其他文章一致，本文将使用 Ramda 版本的函数。
*/

//  R.forEach
// 不必写显式的循环，而是用forEach替代循环。
// old
let myArray = [1, 2, "teng"];

for (const value of myArray) {
    console.log(value);
}
console.log(typeof(R.forEach));
// with
R.forEach(value => console.log(value), myArray);