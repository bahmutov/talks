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

> I need ANSI colors in my project

    npm search colors
    npm info chalk
    npm home chalk
    npm install chalk --save
    // index.js
    require('chalk');
    console.log( chalk.blue('Hello world!') );

---
![if (wheel) return 'invented' fullscreen](https://raw.github.com/bahmutov/talks/master/images/3-projects-use-3rd-party.png)

```notes
Do not reinvent the wheel. Search for a module that does what you need,
is updated frequently and has good readme and tests
```

## Where to find 3rd party modules?

* https://www.npmjs.org/ search by keyword
* http://www.jsdb.io/, http://www.javascriptoo.com/
* http://microjs.com/

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

* Use [grunt-nice-package](https://github.com/bahmutov/grunt-nice-package)
* Setup tests / jshint [Travis-ci](https://travis-ci.org/)
* Use [status badges](http://bahmutov.calepin.co/project-status-badges.html)
* Generate README using [grunt-readme](https://www.npmjs.org/package/grunt-readme)

---
![60 seconds fullscreen](https://raw.github.com/bahmutov/talks/master/images/readme-example.png)

## Great practices

* Use [semantic versioning](http://semver.org/) `major.minor.patch`
  * Cannot `npm publish -f` anymore!
* Answer opened issues quickly
* Describe how your project is different
* Use README.md, avoid wiki

---
![Clone/fix fullscreen](https://raw.github.com/bahmutov/talks/master/images/3-projects-fix.png)

## Clone / fix

    git fork public project to your private Git server
    in package.json
    "dependencies": {
      "name": "git:your server url/name # tag or commit"
    }

The most powerful 30-second argument for using git + nodejs.

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

---
![GT depends on fullscreen](https://raw.github.com/bahmutov/talks/master/images/gt-dependencies.png)

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

## TODO next-update-stats

## TODO next-updater

[slides-now-footer]: "@bahmutov"
[slides-now-theme]: "full"
