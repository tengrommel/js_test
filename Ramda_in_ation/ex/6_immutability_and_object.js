// 读取对象属性
const wasBornInCountry = person => person.birthCountry === OUR_COUNTRY
const wasNaturalized = person => Boolean(person.naturalizationDate)
const isOver18 = person => person.age >= 18

const isCitizen = either(wasBornInCountry, wasNaturalized)
const isEligibleToVote = both(isOver18, isCitizen)
    // prop

// 幸运的是， Ramda 为我们提供了访问对象属性的辅助函数：prop。
// 使用 prop，可以将 person.birthCountry 转换为 prop('birthCountry', person)。现在来试试。
const wasBornInCountry_R = person => R.equals(R.prop('birthCountry', person), OUR_COUNTRY)
const wasNaturalized_R = person => Boolean(R.prop('naturalizationDate', person))
const isOver18_R = person => R.gte(R.prop('age', person), 18)