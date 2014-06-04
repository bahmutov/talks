# Bonus

* This presentation: [http://goo.gl/MafEMk](http://goo.gl/MafEMk)
* Blog: [http://bahmutov.calepin.co/](http://bahmutov.calepin.co/)
* Tools: [http://glebbahmutov.com/](http://glebbahmutov.com/)
* [@bahmutov](https://twitter.com/bahmutov)

And now if we have time ...

## Process: code reviews

We are very happy with [Phabricator](http://phabricator.org/)
open source review system.

* very convenient, fast, flexible local branching for reviews.

```notes
provides good interface for updating branch after feedback,
squashes each branch into single commit for merging.
```

---
![Phabricator fullscreen](https://raw.github.com/bahmutov/talks/master/images/phabricator-screenshot.png)

## Process: short-lived branches

Each feature, bug, refactoring gets its own local Git branch.
Long running branches with lots of changes are actively discouraged
by the team.

My typical branch is a couple of hours old before it gets merged
back into the master.

```notes
Single small feature branches are easier to review, easier to merge,
and allow other people to keep developing in parallel.

I wish we could enforce maximum age of the branch before abandoning it.
```

## Process: code simplicity

> What matters for simplicity is that there's no interleaving
>                          Rich Hickley, the author of Closure

We achieve code simplicity by measuring
[code complexity](https://github.com/vigetlabs/grunt-complexity) and by code
reviews where anything hard to understand at first glance is red flagged.

```notes
We consider multi-purpose code a reason to reject commit during
review. Keeping code simpler is more important to us than even
writing fast software, or even covering every possible edge case.
```

## Test code

(Unit) testing code goes hand in hand with the production code.

> Use same review and code quality rules for the testing code.
> Developers write code and test it.

## Process: short cycle

Long iterations between deployments kill a chance to fix the bug quickly.

* Local dev version of the code is very different from production
* The developer has to understand the code AGAIN in order to fix it.

## Agile team with quick releases

* Without lots of features to support, releases should be frequent.
  * If anything goes wrong, fix it quickly
* Small team can direct the bug to the developer who has just worked on it.

## Features in short cycles

* Work on fix or feature
* Commit to source
* Observe dev deployment - verify
* Observe staging deployment - verify
* Observe prod deployment - verify

Same developer in very close time sequence.

```notes
When same developer guides the feature through dev, then staging then
production environment, without a significant time gap, the features
land smoothly.
```

## Process: write less code

* Use 3rd party libraries
* Stop writing code

## Process: be part of open source

All libraries we use are open source: lots of people are discovering
and fixing bugs.

We pay it forward by open sourcing little utilities:
[d3-helpers](https://github.com/bahmutov/d3-helpers),
[functional-pipeline](https://github.com/bahmutov/functional-pipeline),
[lazy-ass](https://github.com/bahmutov/lazy-ass),
[stop-angular-overrides](https://github.com/bahmutov/stop-angular-overrides)

```notes
Open sourced projects can take advantage of the infrastructure
provided by the internet companies:

- source control and space (github, bitbucket)
- build and test servers (codeship.io, drone.io, travis.ci)
- code coverage and quality (coveralls.io, codeclimate.com)
```

## Stop writing code: example

```js
var line = d3.svg.line()
  .x(function (d) { return xScale(new Date(d.date)); })
  .y(function (d) { return yScale(+d.y); });
// to
var line = d3.svg.line()
  .x(d3h('date', d3h.newDate, xScale))
  .y(d3h('y', Number, yScale));
```

We wrote [d3-helpers](https://github.com/bahmutov/d3-helpers) that construct
callbacks for D3 charts with no imperative code.

---
![code readability](https://raw.github.com/bahmutov/talks/master/images/code-reading-order.png)

```notes
We wrote several tiny utilities to alleviate JavaScript's
reading order problem: you read properties and method calls left to right,
but you read functional calls from inside out.

functional-pipeline and d3-helpers allow composing new functions
where every steps read very naturally left to right.

Remember: naturally looking code is easier to understand, thus
making logical bugs or even syntax bugs less likely.
```

## People: functional-lite programming

```js
// search string might contain multiple ticker symbols to search for
// GOOG, AMZN, F
// GOOG AMZN F ^GSPC
multipleQuery: function (str) {
  lazyAss(check.string(str),
    'ticker query should be a string, not', str);
  str = str.toLowerCase();

  var tickers = splitSearchString(str);
  lazyAss(check.array(tickers),
    'cannot split ticker search string', str);

  return fetchTickers.then(function (tickerData) {
    lazyAss(check.array(tickerData),
      'ticker data should be an array, got', tickerData);
    return {
      results: _(tickerData)
        .filter(_.partial(hasAnySymbol, tickers))
        .sortBy('ticker')
        .value()
    };
  });
},
```

```notes
This is an example of our typical JavaScript code.
There are defensive assertions at each step to ease the debugging,
asynchronous pipeline using promises (fetchTickers.then)
and a chained data processing (filtering and sorting) using 3rd party
library.

We find this functional-lite data processing to be more error-proof
than object-oriented or imperative programming. We still have some
stateful objects, for ideas how to combine functional and object-oriented
programming see "Boundaries" talk by Gary Bernhardt
https://www.destroyallsoftware.com/talks/boundaries
```

## When learning backfires

If your developers cannot use products they learn about, the developers
will get frustrated, restless, then become angry, and will probably leave.

You cannot keep the best developers if they are not allowed to stay on
the edge of the development tools.

```notes
I have never met any developer who preferred to use older version of any
software. I love progress for progress' sake, and always look forward new
techniques or software versions. There is no antique software charm.

Leaving on the bleeding edge is dangerous. Most developers want to be
close without falling over. 1 minor version behind the latest stable
version is a good place to keep everyone happy.
```

## TODOs

Do not keep technical debt in your head, but lighter than
JIRA issues.

```
TODO(gleb): fix the loop conditions
```

Custom Arcanist linting rule. Same as [todo-format](https://github.com/bahmutov/todo-format),
[grunt-todos](https://github.com/kevinlacotaco/grunt-todos).

### Extensions: expires, jira ticker number

## Keep master clean

* File watchers run build and tests locally
* [Arcanist](https://github.com/phacility/arcanist) rus linting and unit
tests (for changes) before generating review requests or landing changes.
* Unit tests and automation tests before rolling back change that breaks them.
