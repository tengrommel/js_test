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

// Ramda 还提供了其他比较运算符的替代：gt 对应 >，lt 对应 <，lte 对应 <=。
/*
注意，这些函数保持正常的参数顺序（gt 表示第一个参数是否大于第二个参数）。
这在单独使用时没有问题，但在组合函数时，可能会让人产生困惑。
这些函数似乎违反了 Ramda 的 "待处理数据放在最后" 的原则，所以我们在 pipeline 或类似的情况下使用它们时，要格外小心。
这时，flip 和 占位符 (__) 就派上了用场。
除了 equals，还有一个 identical，可以用来判断两个值是否引用了同一块内存。
=== 还有一些其他的用途：可以检测字符串或数组是否为空（str === '' 或 arr.length === 0），也可以检查变量是否为 null 或 undefined。
Ramda 为这两种情况提供了方便的判断函数：isEmpty 和 isNil。
*/

// Logic(逻辑)
const lineWidth = settings.lineWidth || 80
    // defaultTo 检查第二个参数是否为空（isNil）。如果非空，则返回该值；否则返回第一个值。
const lineWidth_ramda = R.defaultTo(80, settings.lineWidth)

// Conditionals (条件)
/*
控制流在函数式编程中不是必要的，但偶尔也会有些用处。
*/
// ifElse
const forever21 = age => age >= 21 ? 21 : age + 1
    // Ramda的ifElse函数 if...then...else或?:的函数
const forever21_ramda = age => R.ifElse(R.gte(_, 21), () => 21, inc)(age)
const forever21_lte_ramda = age => R.ifElse(R.lte(21), () => 21, inc)(age)

// constants (常量)
// 常量函数在这种情形下非常有用。
const forever = age => R.ifElse(R.gte(_, 21), R.always(21), inc)(age)

// identity(恒等)
// 再来写一个函数：alwaysDrivingAge。
// 该函数接受一个年龄，如果 gte 16，则将该年龄返回；
// 但如果小于 16，则返回 16。这样任何人都可以伪造他们的驾驶年龄了，即使他们还没有达到。
const alwaysDrivingAge = age => R.ifElse(R.lt(__, 16), R.always(16), R.identity)(age)
    // when 和 unless
const alwaysDrivingAge_R = age => R.when(R.lt(__, 16), R.always(16))(age)
const alwaysDrivingAge = age => R.unless(R.gte(__, 16), R.always(16))(age)
    // cond
    // Ramda 还提供了 cond 函数，来代替 switch 语句或链式的 if...then...else 语句。
const water = temperature => R.cond([
    [equals(0), R.always('water freezes at 0C')]
    [equals(100), always('water boils at 100°C')],
    [T, temp => `nothing special happens at ${temp}°C`]
])(temperature)