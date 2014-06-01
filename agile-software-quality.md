# Agile Software Quality

> How to build software (quickly) that works

## Problem

* Your company is small
* Your software must work
* Your development and testing budgets are small

How do you quickly deliver quality software?

```notes
Imagine you are a small company, trying to capture a piece
of the market. You have to compete with larger established
companies. They have everything: developed products, paying
customers, plans for the future.

You have only some software, maybe a few customers and lots
of plans. How do you compete? How do you have enough resources
to deliver a product that always works? You probably have one
chance to impress a customer. Anything that does not work
damages the relationship since there is no proven track record
to fall on.
```

## Presenter

Dr. Gleb Bahmutov, PhD computer science, Purdue University.

* ObjectBuilders, 3DDigital, EveryScape
* MathWorks
* uTest (now Applause), Kensho

```notes
I worked mostly in small(er) companies, with the exception
of MathWorks. At Kensho I was given pretty much free reign
to use any tools necessary to deliver good front / back end
software. The process we employ is very different from the
process at MathWorks or even at my other startups.
```

## Kensho

Small (15 people) startup [trying to change](http://goo.gl/exPHEX) the world of financial analysis.

* front end: angularjs, D3, Django
* gruntjs for building the front-end
* back end: Python
* puppet / chef / docker deployment

## Starting fresh: the biggest advantage

> As a small starting company you can deliver a feature solving the
customer's EXACT need.

```notes
A company with several customers will be slow to solve one customer's
problem. Even when desired, it will take take, since there are
other customers and legacy support worries.
```

## Moving target

We are always delivering a prototype-quality software to
find IF it solves customer's need.

Then we tighten the screws and make it maintainable in the long run.

## 2 goals

1. Deliver software *quickly*
2. Deliver software that *works*

## Quick feature delivery

- MathWorks: at least 6 months / 3-6 weeks.
- EveryScape/uTest: at least 1 month
- Kensho: at least 1 hour for small bug fixes / features,
days for larger features.

```notes
Delivering new features or fixing bugs when one does not have to
worry too much about coordinating marketing, sales, etc. is great!

I will not discuss when and how new features should be prioritized.
The product development is completely different topic. For now,
the features we have delivered at Kensho are part of our broad vision
and customer requests that fit this vision.
```

## How fast is fast?

> If you discover a bug and report it, how fast should it be fixed
to wow you?

1. 1 year
2. 1 month
3. 1 week
4. 1 day
5. 1 hour

## Quality /= Testing

First observation: *as a small company you cannot test your way to quality*

You do not have enough human and TIME resources to do enough testing.

```notes
MathWorks or Amazon can dedicate weeks and months to testing after
freezing the feature work. You often need to release quickly.
Even automated tests are too slow - because you must spend time
writing and maintaining them.
```

## Axiom 1

> Every software system has bugs.

```notes
your operating system has bugs, your printer driver has bugs, your favorite website
has bugs. The sooner you accept this fact the better.
```

## No testing?

> What do we do instead?

```notes
Let me try describe a solution we have been using very successfully at Kensho
to avoid some of the more time-consuming testing (integration, manual user interface testing).
```

## 2 part solution

* bug prevention
* extremely quick fixes

```notes
The best way to reduce need for testing is to prevent bugs from sneaking in.
But if the discovered bug is fixed very quickly - the users forgive.
```

## Bug prevention: code reviews

We are very happy with [Phabricator](http://phabricator.org/)
open source review system.

* very convenient, fast, flexible local branching for reviews.

```notes
provides good interface for updating branch after feedback,
squashes each branch into single commit for merging
```

## Bug prevention: simplicity

> What matters for simplicity is that there's no interleaving
>                          Rich Hickley, the author of Closure

We achieve code simplicity by measuring code complexity and by code
reviews where anything hard to understand at first glance is red flagged.

```notes
We consider multi-purpose code a reason to reject commit during
review. Keeping code simpler is more important to us than even
writing fast software, or even covering every possible edge case.
```

## Bug prevention: short-lived branches

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

## Tests themselves

(Unit) testing code goes hand in hand with the production code.

> Use same review and code quality rules for the testing code.


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

[slides-now-title]: "Agile quality by @bahmutov"
[slides-now-theme]: "full"
