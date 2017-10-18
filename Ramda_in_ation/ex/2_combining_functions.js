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


// Both/Either
// 一下代码为逻辑
const wasBornInCountry = person => person.birthCountry == OUT_COUNTRY
const wasNaturalized = person => Boolean(person.naturalizationDate)
const isOver18 = person => person.age >= 18
const isCitizen = person => wasBornInCountry(person) || wasNaturalized(person)
const isEligibleToVote = person => isOver18(person) && isCitizen(perosn)
    /*
    both 接受两个函数，返回一个新函数：当两个传入函数都返回 true 值时，新函数返回 true，否则返回 false
    either 接受两个函数，返回一个新函数：当两个传入函数任意一个返回 true 值时，新函数返回 true，否则返回 false
    */
const isCitizen_ramda = R.either(wasBornInCountry, wasNaturalized)
const isEligibleToVote_ramda = R.both(isOver18, isCitizen)

/*
Ramda 还提供了 allPass 和 anyPass，接受由任意多个函数组成的数组作为参数。
如名称所示，allPass 类似于 both，而 anyPass 类似于 either。
*/

// Pipelines(管道)
/*
有时我们需要以 pipeline 的方式将多个函数依次作用于某些数据。
例如，接受两个数字，将它们相乘，加 1 ，然后平方
*/

const multiply = (a, b) => a * b
const addOne = x => x + 1
const square = x => x * x

const operate = (x, y) => {
    const product = multiply(x, y)
    const incremented = addOne(product)
    const squared = square(incremented)
    return squared
}

result = operate(3, 4)
console.log(result)

// pipe

/*
Ramda 提供了 pipe 函数：接受一系列函数，并返回一个新函数。
新函数的元数与第一个传入函数的元数相同（元数：接受参数的个数），然后顺次通过 "管道" 中的函数对输入参数进行处理。
它将第一个函数作用于参数，返回结果作为下一个函数的入参，依次进行下去。
"管道" 中最后一个函数的结果作为 pipe 调用的最终结果
*/
const operate_ramda = R.pipe(multiply, addOne, square)
result_ramda = operate_ramda(3, 4)
console.log(result_ramda)

// compose
// 另一种编写原始operate函数的方式是内联所有暂时变量
const operat_new = (x, y) => square(addOne(multiply(x, y)))
console.log(operat_new(3, 4))
    // 这样更紧凑，但也更不便于阅读。然而这种形式可以使用 Ramda 的 compose 函数进行重写。
const operate_new_ramda = R.compose(
    square,
    addOne,
    multiply
)
console.log(operate_new_ramda(3, 4))

/*
这与上面的 pipe 几乎一样，除了函数的顺序是相反的。实际上，Ramda 中的 compose 函数的内部是用 pipe 实现的。
我一直这样思考 compose 的工作方式：compose(f, g)(value) 等价于 f(g(value))。
*/