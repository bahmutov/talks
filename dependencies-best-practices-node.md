# Dependencies: best practices for Nodejs

> If I have seen further it is by standing on the
> shoulders of (tiny) giants
>                               Sir Isaac Newton

---
![molecular-beam epitaxy machine fullscreen](https://raw.github.com/bahmutov/talks/master/images/MBE-low-res.jpg)

```notes
custom-built molecular-beam epitaxy (MBE) machine builds
almost flawless 100 nanometer thick atomic layers.

Source: http://www.bnl.gov/energy/ces/news.asp?a=1447&t=pr

Often my projects look and feel like this machine:
* too complex
* too complicated
* too hard to maintain or improve
* really really expensive both in terms of time and money

Nodejs is an interesting platform where an alternative to
single project that does everything is possible via
a very nice dependency mechanism is actually working in practice.
```

## About me

Dr. Gleb Bahmutov, PhD

[Kensho](http://www.kensho.com/), ex- lots of companies

Win32 -> C/C++/Java/C#/CoffeeScript/JavaScript -> Node/Browser

[@bahmutov](https://twitter.com/bahmutov),
[glebbahmutov.com](http://glebbahmutov.com/)

~ [60 modules](https://www.npmjs.org/~bahmutov) on NPM registry, 9 plugins for Grunt

---
![large red flags fullscreen](https://raw.github.com/bahmutov/talks/master/images/red-flags.jpg)

```notes
As the project grows, look for red flags signalling that it has to be
refactored and split into smaller units

- build time > 15 seconds
- inability to unit test a specific feature
- two or more programming languages or environments:
DB + API, DB + API + front-end + worker machines
- using AND when describing the goals

Not red flags: size of the code base, number of lines,
number of people, software methodology.
```

## &#9873; small red flags

* From clean to running > 10 minutes
* Insignificance
* Reuse our code somewhere else

In general, [large projects are never finished](http://bahmutov.calepin.co/large-projects-are-never-finished.html)

```notes
- I have been to teams where setting up tools took days.
jQuery checkout and build takes 60 - 90 seconds!
- Hard to increase quality, since every positive change feels insignificant
- We have 10k of lines of code, lets get better return on investment by reusing them.
```

## Problem

* Large project
* Slow feature development
* Lots of trip wires

## Software complexity

Hard to develop software suffers from an interaction problem.
Each item can interact with every other item in the
project.

![Software communication complexity](https://raw.github.com/bahmutov/talks/master/images/3-players.png)

```notes
In a source file with 3 lines/variables/files 3 things interact.
```

---
![Project grows fullscreen](https://raw.github.com/bahmutov/talks/master/images/10-players.jpg)

```notes
As the number of lines increases, each item can interact with other items.
There is no physical separation, aside from folder structure, which
is easily broken.
Total number of communication links grows geometrically n*(n-1)/2, soon overwhelming
the mental capacity of any team. Thus the project calcifies, and new things
are harder to add without breaking the existing functionality.
```

---
![Application assembly fullscreen](https://raw.github.com/bahmutov/talks/master/images/3-projects.png)

```notes
Physically splitting the project into manageable chunks
cuts the number of ways different parts can interact.
Try very hard to have a graph without loops (single root tree, with root being
the ultimate application)
```

## Physical separation

* functions separate variables via scope
* source files separate code
* dependencies separate files

```notes
We use physical separation all the time: a function is
language enforced scope separation for example.
```

## Clear boundary

```js
// function signature
function add(a, b) ...

// package.json
{
    "name": "my-utils",
    "main": "index.js"
    "dependencies": {
        "another-module": "0.1.0"
    }
}
```

```notes
Same approach to package as with functions.
Give good name (=function name), declare what is needs (dependencies = arguments),
and Node will know how to require('my-utils') by loading index.js
```

## index.js

```js
var a = require('another-module');
// index.js
if (module.parent) {
    module.exports = ...
} else {
    // work as CLI
}
```

### avoid

```js
var a = require('./node_modules/another-module/src/something.js');
```

## App assembly principles

* Single repo per app
* Shared code via separate repos via dependencies
* Separate version control / version numbers

[The 12 factor app](http://12factor.net/)

## Nodejs

Makes it very easy to split a project into *individual modules*.
The dependency mechanism is managed by *Node Package Manager.*

* It is an ordinary package itself [npm](https://www.npmjs.org/package/npm)
* `sudo npm update -g npm`

```notes
Comes with nodejs install, generally works.
Most problems recently due the public registry reliability.
The number of listed and stored (as tar zip archives) packages
reached 63k.
```

## NPM in action

> I need ANSI colors in my terminal

```
npm search colors
npm info chalk
npm home chalk
npm install chalk --save
// index.js
require('chalk');
console.log( chalk.blue('Hello world!') );
```




## Splitting large project

* Starting a module
* Replace parts with 3rd party
* Open source parts
* Clone 3rd party into private dependencies

## Starting a module

```
npm init
// answer questions
```

Set `"private": true`

* Use [grunt-nice-package](https://github.com/bahmutov/grunt-nice-package)

---
![if (wheel) return 'invented' fullscreen](https://raw.github.com/bahmutov/talks/master/images/3-projects-use-3rd-party.png)

```notes
Do not reinvent the wheel. Search for a module that does what you need,
is updated frequently and has good readme and tests.
Common examples: logging, async/callback handling
```

## Where to find 3rd party modules?

* https://www.npmjs.org/ search by keyword
* http://www.jsdb.io/, http://www.javascriptoo.com/
* http://microjs.com/
* http://www.echojs.com/
* http://trendingjs.com/

```notes
jsdb displays average time between commits, number of active committers, CDN urls
javascriptoo has nice demos for every project
```

## New and updates 3rd party modules

* http://www.echojs.com/
* http://dailyjs.com/
* [newsletters](http://bahmutov.calepin.co/javascript-and-angularjs-learning-resources.html)

## Enterprise considerations

* License (look for MIT/BSD)
* Use [node-license-sniffer](https://github.com/mwilliamson/node-license-sniffer)
or [licensing](https://github.com/3rd-Eden/licensing)
    * [tldrlegal.com](https://tldrlegal.com/)
* Offline NPM cache (for CI agents for example) see `npm config get cache`

---
![save time and money fullscreen](https://raw.github.com/bahmutov/talks/master/images/3-projects-open-source.png)

```notes
Second great step when splitting a large project - open source
parts that are not your primary business.

The argument is economic: you will not have to maintain
source control (github), continuous build (Travis), code coverage (coveralls.io),
browsers (saucelabs). Plus you get actual people trying to use your module, hopefully
giving you feedback or even code contributions.

tldrlegal.com explains each license in plain english, very well structured website.
```

## Open source increases antifragility

**Fragile** = breaks quickly under stress: porcelain mug, glass statues, modern financial sector.

**Antifragile** = gets stronger under stress: nature, winning team during playoffs.

Open sourcing exposes package to low-level stress (code review, unit testing, reuse),
making it more likely to withstand high stress (unexpected production issue).
For more info see [book review](http://bahmutov.calepin.co/review-antifragile-by-nassim-nicholas-taleb.html)

```notes
One key trait of large projects: they are very brittle. Most parts
never were reused or tested under different circumstances, and are shielded from wide code review,
making them likely to deteriorate in quality over time.
```

## Good package practices

* Setup tests and jshint using [Travis-ci](https://travis-ci.org/)
* Use [status badges](http://bahmutov.calepin.co/project-status-badges.html)
* Generate README using [grunt-readme](https://www.npmjs.org/package/grunt-readme)

---
![60 seconds fullscreen](https://raw.github.com/bahmutov/talks/master/images/readme-example.png)

```notes
You have only a few seconds to grab attention.
Please provide good short package description: multiple drafts are ok!
Use badges to show if module is tested and up to date.
Provide examples!

This is extremely important for internal modules: you do not know who
is going to use your module and what their level of expertise is.
They could be a super expert or could be a novice. Give them enough information
to decide if what you are offering fits their needs. They will do same to you.
Please be kind to your audience.

Badges:

https://nodei.co/ - NPM info
travis - build info
coveralls - code coverage info
david-dm.org - dependencies
```

## Great practices

* Use [semantic versioning](http://semver.org/) `major.minor.patch`
  * Cannot `npm publish -f` anymore!
* Answer opened issues quickly
* Describe how your project is different
* Use README.md, avoid wiki

```notes
If you project is only used internally you can use whatever version names:
sprint numbers, week numbers, dates, seasons. Public modules should follow
semantiv versioning

    0.1.0 < 0.1.x < 0.2.0 < 1.0.0-release < 1.0.0

Markdown captured majority of the docs share at Wiki's expense.
```

---
![Clone/fix fullscreen](https://raw.github.com/bahmutov/talks/master/images/3-projects-fix.png)

## Clone / fix

    git fork public project to your private Git server
    in package.json
    "dependencies": {
      "name": "git:your server url/name # tag or commit"
    }

The most powerful 30-second argument for using git + nodejs.

```notes
You DO NOT have to run private registry to use nodejs dependencies.
Just point package.json at git repos directly and use SHA-1 commit ids,
or tags instead of versions. All benefits of using versioned dependencies
without any complexity.
```

### Pay forward: request your fixes to be pulled back

## Dependency management

> Are we replacing the simplicity and consistency of
> a single project with a dependency mess?

```notes
Yes.
- the mess is manageable.
- the mess maps nicely to the software development:
different parts are developed at different speeds.
```

## Non-problem

> In a single repo model, I could have just fixed the bug.

## Non-problem

In a single repo, because it lacks isolation, you might fix 1 bug,
but it might interact with other parts and introduce 10 new bugs.

This is because you are breaking the rule: *when fixing a problem, change 1 part*.
In single repo, all parts are moving.

## Simple problem 1

> package.json dependencies get out of
> sync with `node_modules`

Use [deps-ok](https://github.com/bahmutov/deps-ok) and
[grunt-deps-ok](https://github.com/bahmutov/grunt-deps-ok).
Much faster than `npm outdated` because only checks top level
dependencies` version numbers.

```notes
Package.json is stored in source control, and if someone updated
dependency version declared there, other people sync the package.json
but do not know if node_modules is outdated. Add grunt-deps-ok as
first step to your grunt default pipeline and they will get a nice
error message to run `npm install`. Also supports bower dependencies
```

## Hard problem: staying up to date

10 top level dependencies.

* Which ones have new releases?
* Which ones I can upgrade without breaking my stuff?
* Can the upgrade process be automated?

```notes
Each project is constantly getting out of date.
The dependencies keep releasing versions, but you have not yet ugraded.
This is a good feature: it protects you.
```

---
![tv update fullscreen](https://raw.github.com/bahmutov/talks/master/images/tv-update.jpg)

## See outdated

See all outdated modules (recursively)

`npm outdated` or `npm outdated --parseable|wc -l`

```notes
Try `npm outdated` on any of your projects to see which
dependencies are out of date.
```

---
![npm outdated fullscreen](https://raw.github.com/bahmutov/talks/master/images/npm-outdated.png)

```notes
Most of these lines are meaningless - we cannot control dependencies deep down the
chain. We only care about top level dependencies WE specified
```

## 1 level only

You control only top level dependencies.

---
![top level dependencies fullscreen](https://raw.github.com/bahmutov/talks/master/images/top-level-dependencies.png)

---
![GT depends on fullscreen](https://raw.github.com/bahmutov/talks/master/images/gt-dependencies.png)

```notes
Great tool to see your dependencies, including badges https://david-dm.org/
```

## It really depends

`npm ls` - shows the dependency tree

`npm ls --parseable` - shows the dependency paths

`npm ls --parseable|sed 's/.*\/\(.*\)/\1/g'|sort|uniq|wc -l` - counts number of unique dependency modules

```notes
slides-now depends on 302 modules
gt depends on 187 modules
coffee-script only depends on 2 immediate dependencies (mkdirp and docco), but this is not entirely true
```

---
![coffee-script dependencies fullscreen](https://raw.github.com/bahmutov/talks/master/images/coffee-script-dependencies.png)

```notes
coffee-script production lists only 5 dependencies,
but there are more dev dependencies that go into making coffee-script
https://david-dm.org/jashkenas/coffee-script#info=dependencies&view=tree
```

---
![coffee-script dev dependencies fullscreen](https://raw.github.com/bahmutov/talks/master/images/coffee-script-dev-dependencies.png)

```notes
https://david-dm.org/jashkenas/coffee-script#info=devDependencies&view=tree

about 40 dependencies total
```

## TODO next-update

---
![next update results fullscreen](https://raw.github.com/bahmutov/talks/master/images/next-update-command.png)

## iOS6 vs iOS7 updates

Apple has switched the way updates are installed.

* iOS6 - pull mechanism
* iOS7 - push mechanism

---
![iOS7 updates fullscreen](https://raw.github.com/bahmutov/talks/master/images/ios7-updates.png)

## Update question

> Can I update *A* from *1.0.0* to *1.1.0*?

```notes
Can I update a dependency without breaking my project?
0.1.0 version change means minor update. Can I believe a person I have never
met not to break something important to ME?
```

## TODO next-update-stats

---
![next-update stats fullscreen](https://raw.github.com/bahmutov/talks/master/images/next-update-stats-cli.png)

## TODO next-updater

## TODO close the loop

# More info

* [Heroku: 10 Habits of a Happy Node Hacker](https://blog.heroku.com/archives/2014/3/11/node-habits)

## Conclusions

Splitting a large project into smaller ones and assembling them
makes it **easier** to do **small** things:

* understanding
* testing
* reusing

```notes
You are admitting that you are a human being: your mental capacity
has a hard limit: it can only keep 4-7 things in your immediate memory at a time.
Splitting things into dependencies allows to remove bunch of things from
your mind, and allows the concentration on immediate task at hand.
```

## Conclusions

Splitting a large project makes *staying up to date* a problem.
Tools like [next-update](https://github.com/bahmutov/next-update) solve it.

[slides-now-footer]: "@bahmutov"
[slides-now-theme]: "full"
