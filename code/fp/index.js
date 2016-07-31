'use strict'

// given an array of numbers, multiply
// even numbers by a constant and print the result
var numbers = [3, 2, 8]
var constant = 2
var k = 0
function mul(a, b) {
  return a * b
}
function print(x) {
  console.log(x)
}
function isEven(x) {
  return x % 2 === 0
}
// function mulBy(K) {
//   return function (x) {
//     return K * x
//   }
// }
const mulBy = K => x => K * x
const double = mulBy(2)
console.log(double.toString())
// for (k = 0; k < numbers.length; k += 1) {
//   if (isEven(numbers[k])) {
//     print(mul(numbers[k], constant))
//   }
// }
