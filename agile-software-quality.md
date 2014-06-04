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
* JIRA, Phabricator, Zulip, Google Apps
* puppet / chef / docker deployment
* git / Amazon / sublime / webstorm

## Dev pipeline

* Local - unit tests
* Debug system - unit tests, automation tests, human tests
  * [casperjs](http://casperjs.org/)
  * outsourced testing team
* Staging - human tests, demos
* Production - human tests, demos

## Starting fresh: the biggest advantage

> As a small starting company you can deliver a feature solving the
customer's EXACT need.

```notes
A company with several customers will be slow to solve one customer's
problem. Even when desired, it will take take, since there are
other customers and legacy support worries.
```

## Moving target

We are always delivering a prototype feature to
find IF it solves customer's need.

Only then we tighten the screws and make it maintainable in the long run.

## 2 goals

1. Deliver software *quickly*
2. Deliver software that *works*

---
![Hard to run and test fullscreen](https://raw.github.com/bahmutov/talks/master/images/mr-incredible.png)

```notes
This is a scene from one of my favorite movies "The Incredibles".
The superhero is discovered and tries to outrun the guns shooting expanding
sticky rubber balls. Soon he is buried under them.

You can watch this particular scene at http://youtu.be/dK_OKGELcn0?t=1m33s

Anyone trying to write large tests, user interface tests
can relate to this scene.
```

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

## Axiom 2

> The way you or your tester uses software is different
from the way your users do.

Small tests benefit from 100% code coverage,
while large tests [do not](https://github.com/bahmutov/talks/blob/master/coverage-and-tests.md).

```notes
In a complex system your tester will cover different parts of the code using
different data from your actual clients.

This goes back to the Ian Bott's presentation at the
[previous meetup](http://www.meetup.com/Automated-Testing-Boston/events/177488452/)
- his explanation of the problem space (infinite) was all about how testers miss bugs that users
have discovered.
```

---
![Desired paths fullscreen](https://raw.github.com/bahmutov/talks/master/images/desired-paths.png)

```notes
"Desired paths" by Jan-Dirk van der Burg http://www.olifantenpaadjes.nl/

Do not build an elaborate path until you are sure this is where the users are walking
```

---
![fullscreen](https://raw.github.com/bahmutov/talks/master/images/i-dont-always-test-everything.png)

```notes
What do we do instead?

Let me try to describe a solution we have been using very successfully at Kensho
to avoid some of the more time-consuming testing (integration, manual user interface testing).
```

## Kensho engineering goals

* fix any bugs extremely quickly
* prevent bugs from sneaking in

```notes
The best way to reduce need for testing is to prevent bugs from sneaking in.
But if the discovered bug is fixed very quickly - the users forgive.
In fact I tend to respect quick bug turn around more - it shows that the
company knows how to develop software.
```

## Quality: focus on changing 3Ps

* Products
* Process
* People

```notes
Improvements in quality can be of 3 types: fixing bug or using different
products is the first category. For example using New Relic or Sentry
is in the "products" category.

Real time exception monitoring or static analysis build step are examples
of the process improvement.

Running book clubs, hackathons and company's libraries are investing in
the people
```

## 3Ps

Based on the [blog posts](http://bahmutov.calepin.co/)

* 57 - [Products](http://bahmutov.calepin.co/category/products.html)
* 22 - [Process](http://bahmutov.calepin.co/category/process.html)
* 7  - [People](http://bahmutov.calepin.co/category/people.html)

```notes
It is much easier to improve quality by fixing a bug or
using a specific product. It is much harder to improve the company's
process, and it extremely hard to improve the people. I personally
believe that in terms of impact improving the people pays off
much larger dividends even in the medium run
```

## Process: real time monitoring

> Users do not see ALL exceptions and hardly report ANY.

Use exception reporting tools, like [Sentry](https://getsentry.com/welcome/)
to get real time picture of all errors in your system.

```notes
Setting up automatic exception reporting system like Sentry
will be THE BEST investment in quality you can make in 1 hour of time.
Works in the browser and back end for most platforms.
If you are a mobile developer, use Crashlytics or Apphance
```

## Sentry Client JavaScript

```
<script src="//cdn.ravenjs.com/1.1.15/jquery,native/raven.min.js"></script>
<script>
Raven.config('https://public@app.getsentry.com/<API ID>').install();
</script>
```

```notes
Single line of code installs global exception handler.
Similarly, server-side installation is very simple
```

---
![Sentry error stream fullscreen](https://raw.github.com/bahmutov/talks/master/images/sentry.png)

```notes
Sentry shows number of times each error has happened, making initial triage
obvious.
```

---
![Sentry error fullscreen](https://raw.github.com/bahmutov/talks/master/images/sentry-error.png)

```notes
There is plenty of information with each error, including stack, and any additional
information
```

## Product: Sentry

More details how to setup Sentry for client code in
[several blog posts](http://bahmutov.calepin.co/tag/sentry.html).

Automatic exception reporting worked wonders and removed need to do a lot of
manual front end testing.

Sentry is good compliment to New Relic and Logstash.

---
![fullscreen](https://raw.github.com/bahmutov/talks/master/images/need-to-subscribe-to-error-monitoring.png)

## Quick fixes for reported exceptions

* User reports a bug, including reproduction steps
* Developer tries to recreate the bug.
* Back and fourth replies
* Finally, the developer recreates the steps and see the bug

> Aha, if the user enters '-1' in age field everything goes crazy!

```notes
Typical amount of information described by the user / tester is only
the surface visible to the user. It takes a long debug cycle to
even recreate the bug. Some bugs are transient and happen only very
infrequently
```

## Quick fix: bug context

> What if every exception reported to Sentry carried a lot of context
information: stack, variables, inputs, environment setup?

Then a developer can determine the root cause of the error by looking
at the exception information.

## Process: assertions everywhere

We use [paranoid coding](http://bahmutov.calepin.co/paranoid-coding.html).

```js
function foo(name, age) {
  check.verify.unemptyString(name, 'Expected a name ' + name);
  check.verify.positiveNumber(age,
    'Expected age to be positive ' + name + ' ' + age);
  ...
}
```

```notes
Paranoid coding is an extreme degree of defensive coding. We do not
trust any input to any function, especially if the input is coming from
other systems or from the user.
```

## People: developer attitude

> "Brian, don't be an optimist"
>             Kensho developers (other than Brian)

```notes
During code reviews we flag things that trust their inputs too much.
```

## Process: assertions revisited

* assertions document the code
* how much defensive coding to write?
  * depends on the [distance](http://bahmutov.calepin.co/defensive-distance.html)
* assertions are like tightening the screws and introducing logical type system WHEN we need one

## Product: lazy assertions

To avoid typing too much and performance penalty, we wrote
[lazy-ass](https://github.com/bahmutov/lazy-ass) - lazy assertions with async throw if needed.

```js
lazyAss(check.unemptyString(name), 'Expected a name', name);
lazyAss(check.positiveNumber(age),
  'Expected age to be positive', name, age);
lazyAssync(items.length === 10,
  'Hmm weird, unexpected number of items', items);
```

## Process: rolling error monitoring

We run typical *local -> debug -> staging -> production* environments.
Crash reporting is enabled in debug, staging and production.
We use *staging* for demos and internal feature feedback.

> Error monitoring in staging allows us to catch and prevent errors
from going into production.

## Process: assertions' role

> We flipped the defensive programming on its head

* Typically assertions are only used in DEBUG mode and are removed in production system.
* We benefit from assertions in PRODUCTION to catch unexpected situations.

## People: project onboarding

We have already seen:

* Product: Sentry / crash reporting
* Process: defensive programming

Can we improve people?

---
![every developer looks like a hammer fullscreen](https://raw.github.com/bahmutov/talks/master/images/hammers.jpg)

```notes
"When you have a hammer, every problem looks like a nail".
But the developers are not same type of hammer, and some of them are axes.
When starting a project, the skills, the experience and the perspectives
do not match.
```

## Final thoughts

A little bug prevention goes a long way towards higher quality.

* Product: crash reporting / error monitoring software
* Process: defensive programming
* People: project on-boarding


```notes
These 3 items, one from each category, will change your team's
productivity and improve the final software quality, mitigating
the need to write lots and lots of tests.

It is possible for a small team to establish itself and compete
against much larger companies, but you would need to think about the
software development process and not be afraid to try new things,
even if you have to invent them.
```

[slides-now-title]: "Agile quality by @bahmutov"
[slides-now-theme]: "full"
[slides-now-timer]: "45"
