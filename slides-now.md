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
timers, links, images, syntax highlighting for code fragments
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
blogs, browser extensions, email. Biggest push came after github / bitbucket
started rendering markdown README.md files by default in each folder.
Worst offender: Prezi with transition style over substance.

Wanted Markdown because it is simple to share the content: it is just
the text document one can read.
```

## Slide markdown format

    # - main presentation title
    ## - starts new slide (or --- or triple blank line)
    * - bullet list
    [title](url) - external link, opens in new tab
    ![title](url) - embed image

```notes
This is just semantic convention for slides-now that
corresponds to the way most Markdown to HTML parsers work:
# title -> <h1>title</h1>
## text -> <h2>text</h2>
```

## Slides-now specific options

Tags at the end of the presentation to control
the visual appearance.

    [slides-now-footer]: "footer text"
    [slides-now-theme]: "cube"
    [slides-now-timer]: "20"

These are ignored other Markdown viewers (or are harmless)

```notes
Full list of options at http://glebbahmutov.com/slides-now/README.md
```

## Browser

I consider HTML5 + JavaScript + CSS the new portable application
platform:

* Websites / web apps
* mobile / compiled to native mobile
* Win8, or compiled to native desktop apps

```notes
Consider the target demographics for slides-now - probably
uses standards-compliant browsers (no < IE9). I can rely on latest
markup and javascript APIs without worrying about browser quirks.
This means the development is extremely fast. Same applies because
use jQuery and AngularJs; they speed things up.
```

## Application Cache

Need to be able to show presentation **without** internet.
Use `<html manifest="cache.manifest">` in *index.html*

**benefit:** application appears very very fast.

**downside:** need to refresh app twice

```notes
Browser application offline manifest lifecycle.
Downside: user needs to refresh twice to get new version.
```


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

```notes
cache.manifest file from slides-now
Lines starting with # are comments
Several sections: CACHE MANIFEST, CACHE, NETWORK
Google analytics is the only non-cached exception.
Embedded timestampt in the manifest file to let the browser
know about the changes.
```

## Bespoke plugins

## Building the app

* Code organization
* Gruntfile
* 3rd party code

## Reusing slides-now

* Stand alone version
* Chrome extension

## Themes

```notes
Slide appearance: fonts, colors, sizes
Good example [full.css](css/themes/full.css)
```

---
    /* Full slide theme without a border */
    .full {
      background: rgba(255, 255, 255, 0.2);
    }
    .full section.bespoke-slide {
      background: rgb(255, 255, 255);
      border: none;
    }
    .full a:hover {
      background: rgb(225, 225, 225);
    }
    .full a {
      color: rgba(30, 30, 30, 1);
      text-decoration: underline;
    }
    .full h1,
    .full h2,
    .full h3 {
      color: rgb(250, 10, 10);
    }
    .full section.bespoke-before {
      -webkit-transform: translate3d(-100%, 0, 0);
      -moz-transform: translate3d(-100%, 0, 0);
      -ms-transform: translate3d(-100%, 0, 0);
      -o-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    .full section.bespoke-after {
      -webkit-transform: translate3d(100%, 0, 0);
      -moz-transform: translate3d(100%, 0, 0);
      -ms-transform: translate3d(100%, 0, 0);
      -o-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
    .full section.bespoke-inactive code {
      visibility: visible;
    }
    /* other UI elements */
    .full .code-box-expand-icon {
      opacity: 0.2 !important;
    }
    .full .code-box-expand-icon:hover {
      opacity: 0.5 !important;
    }

## Responsive design

* Desktop
* Full screen
* mobile?

```notes
Font sizes, slide size, margins.

What to do about mobile? Tried small screen slide factor -
does not look good, hard to control with swipes.
Try opening https://speakerdeck.com/lara/design-for-performance on a phone -
aweful!

Finally gave up and used responsive JS to show plain content on mobile
without creating slides.
```

## Future

* Controlling the presentation remotely
* Inserting diagrams using browser JS libraries
* Cool video tricks

[slides-now-theme]: "full"
[slides-now-footer]: "Slides-now by @bahmutov"
[slides-now-timer]: "30"
