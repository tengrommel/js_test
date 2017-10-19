const R = require('ramda')

// 命令式vs声明式

// 命令式
/*
简单地说，命令式编程中，程序员需要告诉计算机怎么做来完成任务。
命令式编程带给我们每天会用到的大量的基本结构：
控制流（if-then-else 语句和循环），算术运算符（+、-、*、/），比较运算符（===、>、< 等），和逻辑运算符（&&、||、!）。
*/

// 声明式
/*
而声明式编程，程序员只需告诉计算机我想要什么，然后计算机自己理清如何产生结果。
函数式编程被认为是声明式编程的一个子集。
在一段函数式程序中，我们定义函数，然后通过组合这些函数告诉计算机做什么。
即使在声明式程序中，也需要做一些命令式程序中的工作。
控制流，算术、比较和逻辑操作仍然是必须使用的基本构建块。
但我们需要找到一种声明式的方式来描述这些基本构建块。
*/

// 声明式替换
/*
由于我们使用 JavaScript （一种命令式语言）编程，所以在编写 "普通" JavaScript 代码时，使用标准的命令式结构也是正常的。
但当使用 "pipeline" 或类似的结构编写函数式变换时，命令式的结构并不能很好的工作。
*/

// 算术
/*
Ramda 提供了 add、subtract、multiply 和 divide 函数来替代标准的算术运算符。
原来的程序：
*/
const multiply = (a, b) => a * b
const addOne = x => x + 1
const square = x => x * x
const operate = R.pipe(
    multiply,
    addOne,
    square
)
operate(3, 4) // => ((3 * 4) + 1)^2 => (12 + 1)^2 => 13^2 => 169
    /*
    我们可以使用 Ramda 的 multiply 来代替我们自己实现的乘法，
    可以利用 Ramda 的柯里化 inc 函数的优势来取代我们的 addOne，
    也可以利用 multiply 来编写 square：
    */
const square_ramda = x => R.multiply(x, x)
const operate_ramda = R.pipe(
    R.multiply,
    R.inc,
    square_ramda
)

console.log(operate_ramda(3, 4))

// Comparison(比较)
const wasBornInCountry = person => person.birthCountry === OUR_COUNTRY
const wasNaturalized = person => Boolean(person.naturalizationDate)
const isOver18 = person => person.age >= 18
const isCitizen = either(wasBornInCountry, wasNaturalized)
const isEligibleToVote = both(isOver18, isCitizen)

// 注意，上面的一些函数使用了标准比较运算符（=== 和 >=）。正如你现在所怀疑的，Ramda 也提供了这些运算符的替代。

const wasBornInCountry_R = person => R.equals(person.birthCountry, OUR_COUNTRY)
const wasNaturalized_R = person => R.Boolean(person.naturalizationDate)
const isOver18_R = person => R.gte(person.age, 18)
const isCitizen_R = R.either(wasBornInCountry_R, wasNaturalized_R)
const isEligibleToVote_R = R.both(isOver18_R, isCitizen_R)