# Slides-now

The simplest way to create and show
presentation in your browser

Dr. Gleb Bahmutov, PhD

[@bahmutov](https://twitter.com/bahmutov),
[glebbahmutov.com](http://glebbahmutov.com/)

```notes
Computer graphics, computer vision, panoramas, 3D modeling,
software quality, backend C++ and full-stack JS.
Ex-EveryScape, ex-MathWorks, ex-uTest.
Currently at Kensho: front-end quality, performance, robustness
```

## Demo

* Drop this presentation (Markdown file)
into [slides-now](http://glebbahmutov.com/slides-now/)
* Fullscreen, keyboard controls, themes,
timers, links, images
* Offline mode

## Why?

* I needed simple and straightforward way to deliver
content to my audience.
* I [love markdown](http://bahmutov.calepin.co/i-love-markdown.html)
* PowerPoint/others distract from content: slide themes,
fonts, positions, graphics and images...

```notes
Markdown is very simple to remember, I don't need special tools
to write and share one. Various tools can render from text: wikis,
blogs, browser extensions. Biggest push came after github / bitbucket
started rendering markdown README.md files by default in each folder
```

## Application Cache

Need to be able to show presentation **without** internet

    CACHE MANIFEST
    # version: 0.0.14
    # timestamp: Thu Feb 13 2014 22:35:32

    CACHE:
    index.html
    README.md
    slides-now-vendor.css
    slides-now.css
    slides-now-vendor.js
    slides-now.js
    favicon.png

    NETWORK:
    # Always try to fetch analytics links
    # and any other external links
    *

### benefit: application appears very very fast.

```notes
Browser application offline manifest lifecycle.
Google analytics is the only non-cached exception.
Embedded timestampt in the manifest file.
Downside: user needs to refresh twice to get new version.
```

[slides-now-footer]: "Slides-now by @bahmutov"
[slides-now-timer]: "30"
