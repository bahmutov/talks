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

[slides-now-footer]: "@bahmutov"
[slides-now-theme]: "full"
