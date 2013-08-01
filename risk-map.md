# Risk map

Dr. Gleb Bahmutov, PhD

* [glebbahmutov.com](http://glebbahmutov.com) - tools, examples
* [linkedin profile](http://www.linkedin.com/in/bahmutov)

## Professional background

* Computer science: image processing
* [Virtual tours](everyscape.com) from panoramas
* Love writing solid code
	* continuous build
	* unit testing in every language
	* testing book club

## Risk map

A way to visualize technical debt

## Code Complexity

	function add(a, b) { 
		return a + b 
	}
	// cyclomatic = 1
	// halstead volume = 2

	function abs(a, b) {
		return a >= 0 ? a : -a
	}
	// cyclomatic = 2
	// halstead volume = 3

## JavaScript code complexity

[wiki Cyclomatic complexity](http://en.wikipedia.org/wiki/Cyclomatic_complexity)

[wiki Halstead complexity](http://en.wikipedia.org/wiki/Halstead_complexity_measures)

[jsc](https://npmjs.org/package/jsc) command line tool

	jsc src/*.js

[plato](http://jsoverson.github.io/plato/examples/grunt/)

## Unit test code coverage

[gt](https://npmjs.org/package/gt) via [istanbul](https://npmjs.org/package/istanbul) - instruments test code on the fly.

Reports statement / function / branch coverage.

	gt tests/*.js

## Challenge

Effectively communicate high risk areas

* Code that is too complex
* Code not covered by the tests

## D3 TreeMap

[Live example](http://bl.ocks.org/mbostock/4063582)

* Natural visual hierarchy - maps to files in folders
* Rectangle sizes and color - good enough to show relative
differences
* Different metrics - with smooth transitions


## Complexity data

	{
	  "c:\\git\\gt2\\src\\jsunityinterface.js": {
	    "loc": 6,
	    "cyclomatic": 1,
	    "halstead": 4
	  },
	  "c:\\git\\gt2\\src\\utils\\consolehider.js": {
	    "loc": 20,
	    "cyclomatic": 1,
	    "halstead": 11
	  }
	}

## Test coverage data

	{
	  "c:\\git\\gt2\\examples\\all.js": {
	    "coverage": 100
	  },
	  "c:\\git\\gt2\\examples\\basic\\tests.js": {
	    "coverage": 97
	  }
	}

## Combine data

[paths-tree](https://npmjs.org/package/paths-tree)

Combines and transforms data into single
hierarchy.

	paths-tree jsc.json gt.json > risk.json


## Risk Map

[http://glebbahmutov.com/risk-map/](http://glebbahmutov.com/risk-map/)


[slides-now-footer]: "risk map @bahmutov"
[slides-now-theme]: "bw"
[slides-now-timer]: "20"