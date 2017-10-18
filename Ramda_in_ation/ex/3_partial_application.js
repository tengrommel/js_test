const R = require('ramda')
    /*
    简单的函数链式调用（"pipeline"）时，其中的被调用函数都是一元的（除了首个函数）。但如果要使用多元函数呢？
    例如，假设有一个书籍对象的集合，我们想要找到特定年份出版的所有图书的标题。
    可以使用 Ramda 的集合迭代函数完成该需求：
    */
const publishedInYear = (book, year) => book.year === year
const titlesForYear = (books, year) => {
    const selected = R.filter(book => publishedInYear(book, year), books)
    return map(book => book.title, selected)
}

//如果能将filter和map组合成"pipeline，但我们并不知道该如何处理，因为 filter 和 map 都是二元函数。"

// 高阶函数

/*
在上面的示例中，我们传递了一个箭头函数给 filter：book => publishedInYear(book, year)，但我们想去掉箭头函数。
为了做到这点，需要一个函数：输入一本书，若该书是在指定年份出版的则返回 true。
但还需要一个指定的年份，让该操作更加灵活。

为了解决这个问题，可以将 publishedInYear 变为返回另一个函数的函数。
我将使用普通的语法来实现该函数，以便能够清晰地展示其内部具体实现，然后使用箭头函数实现一个更短版本的函数：
*/


// Arrow function version:
// const publishedInYear = year => book => book.year === year


// Full function version
function publishedInYear_ramda(year) {
    return function(book) {
        return book.year === year
    }
}

// 利用新实现的 publishedInYear，可以重写 filter 调用，从而消除箭头函数：
const titlesForYear_ramda = (books, year) => {
    const selected = filter(publishedInYear_ramda(year), books)
    return map(book => book.title, selected)
}

// 现在，当调用 filter 时，publishedInYear(year) 会立即调用，
// 并返回一个接受 book 为参数的函数，这正是 filter 需要的。

// 部分应用函数

/*
可以按上面的方式重写任何多参数函数。但我们不可能拥有所有我们想要的函数的源码；
另外，很多情况下，我们可能还是希望以普通的方式调用多参数函数。
例如，在其他一些代码中，只是想检查一本书是否是在指定年份出版的，我们可能想要 publishedInYear(book, 2012)，但现在不能再那么做了。
相反，我们必须要用这种方式：publishedInYear(book)(2012)。这样做降低了代码的可读性，也很烦人。
幸运的是，Ramda 提供了两个函数：partial 和 partialRight，来帮我们解决这个问题。
这两个函数可以让我们不必一次传递所有需要的参数，也可以调用函数。
它们都返回一个接受剩余参数的新函数，当所有参数都传入后，才会真正调用被包裹的原函数。

partial 和 partialRight 的区别在于参数传递的顺序：
partial 先传递原函数左侧的参数，而 partialRight 先传递右侧的参数。

回到刚开始的例子，使用上面的一个函数来代替原来对 publishedInYear 的重写。
由于刚开始我们只需要最右侧的参数：year，所以需要使用 partialRight.
*/
const publishedInYear_partial_right = (book, year) => book.year === year
const titlesForYear_partial_right = (books, year) => {
    const selected = filter(R.partialRight(publishedInYear_partial_right, [year]), books)
        // 注意，为被 partial 和 partialRight 包裹的函数提供的参数必须包裹在数组中，即使只有一个参数。我不会告诉你我已经忘记了多少次，导致出现令人困惑的错误信息：
        // First argument to _arity must be a non-negative integer no greater than ten

    return map(book => book.title, selected)
}

// 如果publishedInYear原本参数为(year,book)，而非(book, year),则需要用partial代替partialRight

// 柯里化(Curry)
/*
 如果到处使用 partial 和 partialRight 的话，会让代码变得冗长乏味；但是，将多元函数以一系列一元函数的形式调用同样不好。
 幸运的是，Ramda 给我们提供了一个解决方案：curry。
 Currying（柯里化） 是函数式编程的另一个核心概念。
 从技术角度讲，一个柯里化了的函数是一系列高阶一元函数，这也是我刚刚抱怨过的。
 在纯函数式语言中，柯里化函数在调用时，语法上看起来和调用多个参数没有什么区别。
 在 Ramda 中，一个柯里化的函数只能用其参数的子集来调用，它会返回一个接受其余参数的新函数。
 当使用它的所有参数调用，真正的原函数将被调用。
 柯里化的函数在下列两种情况下工作的都很好：
    可以按正常情况下使用所有参数调用它，它可以像普通函数一样正常工作；
    也可以使用部分参数来调用它，这时它会像使用 partial 一样工作。
    
    注意，这种灵活性带来了一些性能上的损失，因为 curry 需要搞清楚函数的调用方式，然后确定该做什么。
 一般来说，我只有需要在多个地方对同一个函数使用 partial 的时候，才会对函数进行柯里化。

    接下来写一个柯里化版本的 publishedInYear 函数。注意，curry 会像 partial 一样工作；并且没有 partialRight 版本的 curry 函数。
 对这方面后续会有更多讨论，但现在我们需要将 publishedInYear 的参数翻转一下，以便让参数 year 在最前面。
 */

const publishedInYear_curry = R.curry((book, year) => book.year === year)
const titlesForYear_curry = (books, year) => {
    const selected = R.filter(publishedInYear_curry(year), books)
    return R.map(book => book.title, selected)
}

// 参数的顺序

/*
注意，为了让curry工作，我们不得不对参数的顺序进行翻转。
这在函数式编程中非常常见，所以几乎所有的Ramda函数都将待处理的数据放到参数列表的最后面。

你可以将先期传入的参数看作对操作的配置。
所以，对于 publishedInYear，参数 year 作为配置（需要查找的年份），而参数 book 作为被处理的数据（被查找的对象）。
*/

// 顺序错误的参数
/*
Ramda
*/

// filp

/*
第一个选择是 flip。
flip 接受一个多元函数（元数 >= 2），返回一个元数相同的新函数，但前 2 个参数的顺序调换了。
它主要用于二元函数，但也可以用于一般函数。

使用flip,我们可以恢复publishedInYear参数的初始的顺序
*/
const publishedInYear_filp = R.curry((book, year) => book.year === year)
const titlesForYear_filp = (books, year) => {
    const selected = R.filter(flip(publishedInYear_filp)(year), books)
    return R.map(book => book.title, selected)
}

// placeholder（占位符）

/*
更通用的选择是使用 "placeholder" 参数（__）
假设有一个三元柯里化的函数，并且我们想传入第一个和最后一个参数，中间参数后续再传，应该怎么办呢？我们可以使用 "占位符" 作为中间参数：
*/
const threeArgs = R.curry((a,b,c)=>{})
const middleArgumentLater = threeArgs('value for a', R._, 'value for c')

// 也可以使用 "占位符" 代替 flip：
const publishedInYear_ = R.curry((book, year) => book.year==year)
const titlesForYear_ = (books, year) => {
    const selected = R.filter(publishedInYear_(_, year), books)
    return R.map(book => book.title, selected)
}

// 来做一条管道
// 现在看看能否将我们的 filter 和 map 调用放入 "pipeline" (管道)中？下面是代码当前的状态，使用了方便的参数顺序的 publishedInYear：
const publishedInYear_pipe = R.curry((year, book)=> book.year === year)
const titlesForYear_pipe = (book, year) => {
    const selected = R.filter(publishedInYear_pipe(year), books)
    return R.map(book=>book.title, selected)
}

// 编写pipe
const publishedInYear_end = curry((year, book) => book.year === year)

const titlesForYear_end = (books, year) => 
    R.pipe(
        filter(publishedInYear_end(year)),
        R.map(book=>book.title)
    )(books)