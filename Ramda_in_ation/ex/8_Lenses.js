const R = require('ramda')

// 透镜
/*
透镜将"getter"和"setter"函数组合为一个单一模块。
*/

// 如何创建透镜
/*
在Ramda中，最常见的创建透镜的方法是lens函数。
lens接受一个"getter"函数和一个"setter"函数，然后返回一个新透镜。
*/
const person = {
    name: 'Randy',
    socialMedia: {
        github: 'tengrommel',
        twitter: '@tengrommel'
    }
}

const nameLens = R.lens(R.prop('name'), R.assoc('name'))
const twitterLens = R.lens(
    R.path(['socialMedia', 'twitter']),
    R.assocPath(['socialMedia', 'twitter'])
)

// Path 
// [Idx] → {a} → a | Undefined
// Idx = String | Int
console.log(R.path(['a', 'b'], { a: { b: 2 } }));
console.log(R.path(['a', 'b'], { c: { b: 2 } }));

// accocPath 修改值
R.assocPath(['a', 'b', 'c'], 42, { 'a': { b: { c: 0 } } });

// 使用
/*
Ramda 提供了三个配合透镜一起使用的的函数：
    view：读取透镜的值。
    set：更新透镜的值。
    over：将变换函数作用于透镜。
*/
let result_name = R.view(nameLens, person)
console.log(result_name)

R.set(twitterLens, '@randy', person)

R.over(nameLens, R.toUpper, person)