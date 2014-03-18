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

[Kensho](http://www.kensho.com/), ex- lots of companies.
**HIRING**

Win32 -> C/C++/Java/C#/CoffeeScript/JavaScript -> Node/Browser

[@bahmutov](https://twitter.com/bahmutov),
[glebbahmutov.com](http://glebbahmutov.com/)

~ [60 modules](https://www.npmjs.org/~bahmutov) on NPM registry, 9 plugins for Grunt

## Presentation overview

* Problem, red flags
* Minimize complexity by separation
* Nodejs and npm
* Splitting large projects
* Keeping dependencies up to date using
custom tools

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
* Cannot reuse code somewhere else

In general, [large projects are never finished](http://bahmutov.calepin.co/large-projects-are-never-finished.html)
and [monolithic Node does not work well](http://www.richardrodger.com/monolithic-nodejs)

```notes
- I have been to teams where setting up tools took days.
jQuery checkout and build takes 60 - 90 seconds!
- Hard to increase quality, since every positive change feels insignificant
- We have 10k of lines of code, lets get better return on investment by reusing them.
```

## Software complexity

All software code suffers from **interaction complexity**

Each item can interact with every other item in the
project.

```js
var sum = a + b;
```

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

## Solution: physical separation

* functions separate variables via scope
* source files separate code
* teams separate people
* dependencies separate files

```notes
We use physical separation all the time: a function is
language enforced scope separation for example.
```

---
![Application assembly fullscreen](https://raw.github.com/bahmutov/talks/master/images/3-projects.png)

```notes
Physically splitting the project into manageable chunks
cuts the number of ways different parts can interact.
Try very hard to have a graph without loops (single root tree, with root being
the ultimate application)
```

## Clear boundary

```js
// function signature
function add(a, b) { body ... }

// package.json
{
    "name": "my-utils",
    "main": "index.js"
    "dependencies": {
        "module-a": "1.0.0",
        "module-b": "0.1.0"
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
var a = require(
    './node_modules/another-module/src/something.js');
```

## App assembly principles

* Single repo per app
* Shared code via separate repos via dependencies
* Separate version control / version numbers

[The 12 factor app](http://12factor.net/)

## Why Nodejs?

Makes it very easy to split a project into *individual packages*.
The dependency mechanism is managed by *Node Package Manager.*

* It is an ordinary package itself [npm](https://www.npmjs.org/package/npm)
* `sudo npm update -g npm`

```notes
Comes with nodejs install, generally works.
Most problems recently due the public registry reliability.
The number of listed and stored (as tar zip archives) packages
reached 63k.
```

## Transitive

You can use different versions of same module

```
// dependencies-resolution uses module-a@2.0.0, module-b@0.6.0
// module-b@0.6.0 uses module-a@1.0.0

$ npm list
dependencies-resolution@0.0.0
├── module-a@2.0.0
└─┬ module-b@0.6.0
  └── module-a@1.0.0
```



## npm vs bower

NPM public registry keeps copies of entire package.
Bower registry only keeps urls to git repos + the author
selects which files to include.

You can still exclude certain files using .npmignore file.

npm registry suffers from outages.

```notes
NPM tar archives include all the code, while bower is mostly
used to distribute final front end libraries.
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

(optional) set `"private": true`

* Use [grunt-nice-package](https://github.com/bahmutov/grunt-nice-package)
* Look at [yeoman](http://yeoman.io/), [ninit](http://akoenig.github.io/ninit/)

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

* http://www.echojs.com/, http://dailyjs.com/
* [newsletters](http://bahmutov.calepin.co/javascript-and-angularjs-learning-resources.html)
* Look at what other packages use.

## Enterprise considerations

* License (look for MIT/BSD)
* Use [node-license-sniffer](https://github.com/mwilliamson/node-license-sniffer)
or [licensing](https://github.com/3rd-Eden/licensing)
    * [tldrlegal.com](https://tldrlegal.com/)
* Offline NPM cache (for CI agents for example) `npm config get cache`
* Run private [registry](https://www.npmjs.org/doc/misc/npm-registry.html)
or [proxy](https://github.com/paypal/kappa)

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

## Open sourcing benefits

* Higher quality (next slide)
* Economic: use free infrastructure
* Human: happier employees, more visibility

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
Please provide a good short package description: multiple drafts are ok!

Use badges to show if module is tested and up to date.

Describe a typical problem and give an example.

Same principles apply to internal modules: you do not know who
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
or tags instead of versions. NPM can use anything that resolved to
a folder with package.json file as a target!

All the benefits of using versioned dependencies without any complexity.
```

## Dependency management

> Are we replacing the simplicity and consistency of
> a single project with a dependency mess?

```notes
Yes.
- the mess is manageable.
- the mess maps nicely to the software development:
different parts are developed at different speeds.
- using versioned dependencies isolates the true mess: constant merging of commits
```

## Non-problem 1

> In a single repo model, I could have just fixed the bug.

## Non-problem 1

In a single repo, because it lacks isolation, you might fix 1 bug,
but it might interact with other parts and introduce 10 new bugs.

This is because you are breaking the rule: *when fixing a problem, change a single part*.

In a single repo, all parts are moving and interacting.

```notes
Solving 1 or 2 interacting parts is easy.
Solving 3-body in space problem is still a very interesting
physics question http://en.wikipedia.org/wiki/Three-body_problem
```

## Non-problem 2

> I could branch single repo and fix one bug

You can easily clone and branch individual dependencies too.

## Actual problems

```
// package.json
{
    "dependencies": {
        "module-a": "1.0.0"
    }
}
// node_modules/module-a/package.json
{
    "version": "0.8.0"
}
// npm registry:
module-a: 0.8.0, 0.9.0, 1.0.0, 2.0.0
```

```notes
There are two problems in the above situation: a small and a large one.

Small problem: declared version of module-a in package.json
differs from installed version in node_modules/

Large problem: module-a version is behind, there are multiple new
releases available
```

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
    * Each project can iterate very fast
* Which ones I can upgrade without breaking my stuff?
* Can the upgrade process be automated?

**Relevant** Slashdot
["A Call For Rollbacks To Previous Versions of Software"](http://tech.slashdot.org/story/14/03/18/151216/a-call-for-rollbacks-to-previous-versions-of-software)

```notes
Each project is constantly getting out of date.
The dependencies keep releasing versions, but you have not yet ugraded.
This is a good feature: it protects you.

Rule of thumb: using 1 release behind the latest to great benefits, but
let bugs in the latest release be ironed out.
```

---
![everything needs to be updated, even TVs fullscreen](https://raw.github.com/bahmutov/talks/master/images/tv-update.jpg)

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

## Dependencies

`npm ls` - shows the dependency tree

`npm ls --parseable` - shows the dependency paths

`npm ls --parseable|sed
    's/.*\/\(.*\)/\1/g'|sort|uniq|wc -l` - counts number of unique dependency modules

```notes
slides-now depends on 302 modules
gt depends on 187 modules
next-update depends on 176 modules
coffee-script only depends on 2 immediate dependencies (mkdirp and docco), but this is not entirely true.

This a true testament to the Nodejs power - a lot of people who have never
met and do not communicate regularly built lots of projects by each contributing a small part.
```

---
![https://david-dm.org/ fullscreen](https://raw.github.com/bahmutov/talks/master/images/gt-dependencies.png)

```notes
Great tool to see your dependencies, including badges https://david-dm.org/.
You can drill down into dependencies.
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

## You control 1 level

Rule: you control only the top level dependencies.

---
![top level dependencies fullscreen](https://raw.github.com/bahmutov/talks/master/images/top-level-dependencies.png)


## next-update

> Can I update dependency *A* from *1.0.0* to *1.1.0*?

[next-update](https://github.com/bahmutov/next-update)

* Fetches available versions
* Installs each version, run tests
* Reports successful updates

**YOUR PROJECT MUST HAVE TESTS**

```notes
If I structure my application the way I suggest: a graph of dependencies,
can I update a dependency without breaking my project?
0.1.0 version change means minor update. Can I believe a person I have never
met not to break something important to ME?
```

---
![next update results fullscreen](https://raw.github.com/bahmutov/talks/master/images/next-update-command.png)

## next-update options

* Install latest version separately (default)
* Install latest versions for all modules at once
* Install and test each version of each module

## Update question

> Am I likely to successfully update *A* from *1.0.0* to *1.1.0*?

I might not have enough tests, and would like to know
in general if module A's version 1.1.0 is compatible with version 1.0.0

```notes
In general, I do not trust the convention that patch version changes
do not break things. I also might be using a small subset of the features
and upgrade across major versions just fine
```

## next-update-stats

[next-update-stats](https://github.com/bahmutov/next-update-stats) is a free
[public server](http://next-update.herokuapp.com)
collecting success / fail anonymous stats sent by next-update

---
![next-update stats fullscreen](https://raw.github.com/bahmutov/talks/master/images/next-update-stats-cli.png)

```notes
next-update-stats server collects anonymous update success / fail stats for public modules.
Each time next-update tests A 1.0.0 -> 1.1.0 update it sends true / false to the server running
at http://next-update.herokuapp.com/
You can get JSON by using http://next-update.herokuapp.com/package/name or data for specific
version pair, for example http://next-update.herokuapp.com/package/lodash/1.0.0/2.4.0
```

---
![http://next-update.herokuapp.com fullscreen](https://raw.github.com/bahmutov/talks/master/images/next-update-stats-website.png)

## next-updater

> Large number of projects getting out of date is a problem.

---
![lots of projects need updates fullscreen](https://raw.github.com/bahmutov/talks/master/images/multiple-projects-out-of-date.png)

```notes
Example: http://glebbahmutov.com/status/ shows the
status for most of my projects in single dashboard
Can I automate next-update for all these projects?
```

---
![Updates come in waves fullscreen](https://raw.github.com/bahmutov/talks/master/images/coffee-script-dependency-waves.png)

## iOS6 vs iOS7 updates

Apple has switched the way updates are installed.

* iOS6 - pull mechanism
* iOS7 - push mechanism

---
![iOS 6 updates fullscreen](https://raw.github.com/bahmutov/talks/master/images/ios6-updates.png)

```notes
iOS 6 asked you to update either each application or all of them.
```

---
![iOS 7 updates fullscreen](https://raw.github.com/bahmutov/talks/master/images/ios7-updates.png)

```notes
iOS 7 has install updates by default mode. You have no assurance that
your data or settings are not going to be preserved, although you assume this
```

## [next-updater](https://github.com/bahmutov/next-updater)

* Clone your git repos one by one
* If builds ok:
* Runs next-update
* If successful AND strong positive next-update-stats
    * update dependency to latest
    * push update to origin

## closing the loop

[next-update-failed](https://github.com/bahmutov/next-update-failed) - include
in your project as dev dependency. Whenever someone uses *next-update* and it
fails for your package, you will get detailed information.

```notes
The work only has started, but this seems like a good idea for enterprise customers.
I was inspired by lots of interesting errors reported by the actual customers when we
started using Sentry http://bahmutov.calepin.co/know-unknown-unknowns-with-sentry.html
I could have never guessed the variety of errors people experience, and our automated
and manual testing lets through.
```

---
![next-update-failed fullscreen](https://raw.github.com/bahmutov/talks/master/images/next-update-failed-principle.png)

## Additional reading

* [npm-developers](https://www.npmjs.org/doc/misc/npm-developers.html)
* [Heroku: 10 Habits of a Happy Node Hacker](https://blog.heroku.com/archives/2014/3/11/node-habits)
* [Publishing a simple package to npm](http://evanhahn.com/make-an-npm-baby/)
* What has changed in new version?
    * [changed CLI tool](https://github.com/bahmutov/changed)
    * [david-dm shows changelog](https://raw.github.com/bahmutov/talks/master/images/david-dm-changelog.png)

## Conclusions

Splitting a large project into smaller ones and assembling them
makes it **simpler** to:

* understand, code and test
* complete things
* be happy

```notes
You are admitting that you are a human being: your mental capacity
has a hard limit: it can only keep 4-7 things in your immediate memory at a time.
Splitting things into dependencies allows to remove bunch of things from
your mind, and allows the concentration on immediate task at hand.
```

## Final thought

Splitting a large project makes *staying up to date* a problem.

[next-update](https://github.com/bahmutov/next-update) - **done**

[next-update-stats](https://github.com/bahmutov/next-update-stats) - **done**

[next-updater](https://github.com/bahmutov/next-updater) - *in progress*

[next-update-failed](https://github.com/bahmutov/next-update-failed) - *to be started*

Any help will be appreciated, [@bahmutov](https://twitter.com/bahmutov)

**Thank you**

[slides-now-footer]: "deps like a boss"
[slides-now-theme]: "full"
[slides-now-timer]: "60"
