const R = require('ramda')
    // Pointfree 风格（无参数风格）
    /*
    Ramda 的两个指导原则：

    将数据放到参数列表的最后面。
    柯里化所有的东西。
    */

const forever21 = age => ifElse(gte(__, 21), always(21), inc)(age)
const forever21_ramda = ifElse(gte(__, 21), always(21), inc)

const water = temperature => cond([
    [equals(0), always('water freezes at 0°C')],
    [equals(100), always('water boils at 100°C')],
    [T, temp => `nothing special happens at ${temp}°C`]
])(temperature)

const water_pointfree = cond([
    [equals(0), always('water freezes at 0°C')],
    [equals(100), always('water boils at 100°C')],
    [T, temp => `nothing special happens at ${temp}°C`]
])

// 多元函数
const titlesForYear = R.curry((year, books) =>
        R.pipe(
            R.filter(publishedInYear(year)),
            R.map(book => book.title)
        )(books)
    )
    /*
    注意，books 出现了两次：一次作为参数列表的最后一个参数（最后一个数据！）；
    一次出现在函数最后，当我们将其传入 pipeline 的时候。
    这跟我们之前看到参数为 age 的模式类似，所以可以对它进行相同的转换：
    */

const titlesForYear_freepoint = year =>
    R.pipe(
        R.filter(publishedInYear(year)),
        R.map(book => book.title)
    )