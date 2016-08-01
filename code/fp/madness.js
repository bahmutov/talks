'use strict'

const unary = f => x => f(x)

console.log(['1', '2', '3'].map(parseFloat))
// 1, 2, 3
console.log(['1', '2', '3'].map(parseInt))
// 1, NaN, NaN
console.log(['1', '2', '3'].map(unary(parseInt)))
// 1, 2, 3
