'use strict'

// given an array of numbers, multiply
// even numbers by a constant and print the result
var numbers = [3, 2, 8]
var constant = 2
function mul(a, b) {
  return a * b
}
function print(x) {
  console.log(x)
}
function isEven(x) {
  return x % 2 === 0
}
const byConstant = mul.bind(null, constant)
const curry = fn => x => y => fn(x, y)
const filter = curry(function filter(fn, list) {
  var k = 0
  const result = []
  for (k = 0; k < list.length; k += 1) {
    if (fn(list[k])) {
      result.push(list[k])
    }
  }
  return result
})
const map = curry((fn, list) => {
  var k = 0
  const result = []
  for (k = 0; k < list.length; k += 1) {
    result.push(fn(list[k]))
  }
  return result
})
const forEach = curry(function forEach(fn, list) {
  var k = 0
  for (k = 0; k < list.length; k += 1) {
    fn(list[k])
  }
})
const onlyEven = filter(isEven)
const multiply = map(byConstant)
const printAll = forEach(print)
const pipe = (f, g, h) => x => h(g(f(x)))
const solution = pipe(onlyEven, multiply, printAll)
solution(numbers)
