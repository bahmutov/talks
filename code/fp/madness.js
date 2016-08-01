'use strict'

const unary = f => x => f(x)
const partialRight = (f, b) => a => f(a, b)

console.log(['1', '2', '3'].map(parseFloat))
// 1, 2, 3
console.log(['1', '2', '3'].map(parseInt))
// 1, NaN, NaN
console.log(['1', '2', '3'].map(unary(parseInt)))
// 1, 2, 3
const parse10 = partialRight(parseInt, 10)
console.log(['1', '2', '3'].map(parse10))
// 1, 2, 3
