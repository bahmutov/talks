'use strict'
const R = require('ramda')
var numbers = [3, 2, 8]
var constant = 2
function print(x) {
  console.log(x)
}
function isEven(x) {
  return x % 2 === 0
}
const solution = R.pipe(
  R.filter(isEven),
  R.map(R.multiply(constant)),
  R.forEach(print)
)
solution(numbers)
