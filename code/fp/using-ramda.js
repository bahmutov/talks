'use strict'
const R = require('ramda')
const numbers = () => Promise.resolve([3, 2, 8])
var constant = 2
function print(x) {
  console.log(x)
}
function isEven(x) {
  return x % 2 === 0
}
const solution = R.pipeP(
  numbers,
  R.filter(isEven),
  R.map(R.multiply(constant))
)
solution()
  .then(R.forEach(print))
