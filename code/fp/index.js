'use strict'

// given an array of numbers, multiply
// even numbers by a constant and print the result
var numbers = [3, 2, 8]
var constant = 2

var k = 0
for (k = 0; k < numbers.length; k += 1) {
  if (numbers[k] % 2 === 0) {
    console.log(numbers[k] * constant)
  }
}
