# Grunt

The JavaScript Task Runner

Dr. Gleb Bahmutov, PhD

**@bahmutov**

## Front end build steps

* code needs to be tested
* js/css files need to be
  * bundled up
  * minified
* templates need to be compiled
* images need adjustment
* versions need to be updated

## Tasks

Think of each build step as a task

## Shell scripts

No

* portability
* power

## Make

Oldest (?) technology still in use

    all: dist/app.js dist/index.html

    dist/app.js: tmp/index.js libs/jquery.js
      concat #$% &$& %$& %$^@!^
      cp -f -y ???

    *.tmp.js: ($@.*.js)
      uglify @$

## example.mk

Very non friendly syntax

    include $(BUILD)/makefiles/bootstrap.mk
    include $(INCLUDE_DIR)/module_interface.mk
    $(foreach R,$(call REQUIREMENTS,.),\
        $(eval $(call BUILD_REQUIREMENT,$(R))))
    ...
    # typical command
    $(JAVAEXE) -Xms512m -Xmx512m -cp "$(DOJO_PATH)/util/shrinksafe/js.jar$(PATH_SEPARATOR)$(DOJO_PATH)/util/closureCompiler/compiler.jar$(PATH_SEPARATOR)$(DOJO_PATH)/util/shrinksafe/shrinksafe.jar" \
    org.mozilla.javascript.tools.shell.Main $(DOJO_PATH)/dojo/dojo.js baseUrl=$(DOJO_PATH)/dojo load=build --profile $(1) $(BUILDMODE)
    @echo "Dojo returned"
    ...

## Ant and Maven

Java world's contribution to task runner

Fixed build lifecycle:

### validate -> compile -> test -> ...

Manages dependencies locally and in central repo.


## Maven positives

* every developer knows what to expect
* **test** step
* managed **dependencies**

## Maven is ...

* inflexible
* super verbose XML configuration
  * all commands through plugins
(pom.xml > 500 loc commong for just jslint, minification and testing)
* slow
* Java-based

## Enter

![Grunt Logo](http://gruntjs.com/img/grunt-logo.svg)

## Ben "Cowboy" Alman

Works at [Bocoup](http://bocoup.com), Boston

![Ben Alman](http://farm7.static.flickr.com/6060/5915265225_a96c228716_m.jpg)


## Grunt 0.1.0 - January 2012

"Doing all this stuff manually is a total pain, and building all this stuff into a gigantic Makefile / [Jakefile](https://github.com/mde/jake) / [Cakefile](http://coffeescript.org/documentation/docs/cake.html) / [Rakefile](http://rake.rubyforge.org/doc/rakefile_rdoc.html) / ?akefile that's maintained across all my projects was also becoming a total pain." - Ben Alman

Latest version **0.4.1** - major rewrite after 0.3.0


## Setup

Install [nodejs](http://nodejs.org/), server-side JavaScript engine.

    npm install -g grunt-cli

Grunt, plugins and project settings are CommonJs modules.


## Example (included)

Create sample project `npm init`

Add **grunt** and a few plugins

    npm i grunt --save
    npm i grunt-contrib-jshint --save
    npm i matchdep --save

Try running `grunt`

## Gruntfile.js



```
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      src: '*.js'
    }
  });

  var plugins = require('matchdep').filter('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  // tasks composed from other tasks
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('pre-commit',
    ['clean', 'jshint', 'all-tests']);
};
```

## Flexibility

    // runs jshint task
    grunt jshint

    // runs another task
    grunt pre-commit

    // run 'default', ignore errors
    grunt --force

    // see what's going on
    grunt --verbose

## Even more flexibility

```js
grunt.initConfig({
    jshint: {
        options: {
            // applies to all subtasks
        },
        sourceFiles: {
            options: {
                // add options for some files
            },
            src: 'src/**/*.js'
        },
        testFiles: {
            src: 'test/**/*.js'
        }
    }
});
// grunt jshint:src
// grunt jshint:gruntfile
```

## Flexibility with tasks

From [concat](https://github.com/gruntjs/grunt-contrib-concat/blob/master/Gruntfile.js) plugin

```
grunt.registerTask('test',
  ['clean', 'concat', 'nodeunit']);

grunt.registerTask('default',
  ['jshint', 'test', 'build-contrib']);
```


## Flexibility with Templates

```
uglify: {
  dist: {
    files: {
      'dist/<%= my.name %>.min.js':
        ['<%= concat.dist.dest %>']
    }
  }
},
my: { name: 'example' }
```

## Flexibility with JSON

```
module.exports = function( grunt ) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: {
      compact: '/*! <%= pkg.name %> <%= pkg.version %> */'
    }
  });
};
```

## Flexibility with JavaScript

**Gruntfile.js** is just a JavaScript file,
so the tasks can be generated programmatically.

```
var jshintOptions = any crazy js code
var myTask = super task

module.exports = function(grunt) {
  jshint: jshintOptions,
  myTask: myTask
};
```

## Debugging

```
var jshintOptions = any crazy js code
console.log(jshintOptions);

module.exports = function(grunt) {
  jshint: jshintOptions
};
```

Or pass *filter* function to see all filenames for a task, see
[Files](http://gruntjs.com/configuring-tasks#files)


## Run tasks in parallel

[grunt-parallel](https://github.com/iammerrick/grunt-parallel)

```
grunt.initConfig({
  parallel: {
    all: {
      options: {
        grunt: true
      },
      tasks: ['jshint', 'unit-test', 'requirejs']
    }
  }
});
```

## grunt plugins

28 official plugins have names like *grunt-contrib-**. Install them all using
single [grunt-contrib](https://npmjs.org/package/grunt-contrib) module.

> 2k (!) user plugins have usually names like *grunt-**

[Full list](http://gruntjs.com/plugins) - generates automatically
from npm registry, modules tagged with *gruntplugin*

Most plugins upgraded to work with grunt **0.4**

## Creating plugins

Writing or updating a plugin is very easy

Use [starter project](https://github.com/gruntjs/grunt-init-gruntplugin-sample) and look
at [creating tasks](http://gruntjs.com/creating-tasks).
See [api docs](http://gruntjs.com/api/grunt).

```js
grunt.registerTask('foo', 'A sample',
  function(arg1, arg2) {
    grunt.log.writeln(this.name + ", " + arg1 + ", " + arg2);
});

grunt foo:first:second
// foo, first, second
```

## grunt-contrib-clean

Typical plugin to delete files / folders.

[README.md](https://github.com/gruntjs/grunt-contrib-clean)

[Source code](https://github.com/gruntjs/grunt-contrib-clean/blob/master/tasks/clean.js)

## Notable plugins

[contrib-clean](https://github.com/gruntjs/grunt-contrib-clean),
[contrib-copy](https://github.com/gruntjs/grunt-contrib-copy),
[contrib-jshint](https://npmjs.org/package/grunt-contrib-jshint),
[grunt-jslint](https://github.com/stephenmathieson/grunt-jslint),
[contrib-csslint](https://npmjs.org/package/grunt-contrib-csslint),
[json-lint](https://github.com/brandonramirez/grunt-jsonlint),
[contrib-qunit](https://npmjs.org/package/grunt-contrib-qunit),
[contrib-sass](https://npmjs.org/package/grunt-contrib-sass),
[contrib-concat](https://npmjs.org/package/grunt-contrib-concat),
[contrib-requirjs](https://npmjs.org/package/grunt-contrib-requirejs),
[grunt-dojo](https://github.com/phated/grunt-dojo),
[contrib-uglify](https://npmjs.org/package/grunt-contrib-uglify),
[contrib-watch](https://npmjs.org/package/grunt-contrib-watch),
[grunt-notify](https://github.com/dylang/grunt-notify)

## More resources

### Examples

[AngularJs Gruntfile.js](https://github.com/angular/angular.js/blob/master/Gruntfile.js),
[Modernizr Gruntfile.js](https://github.com/Modernizr/Modernizr/blob/master/Gruntfile.js),
[jQuery Gruntfile.js](https://github.com/jquery/jquery/blob/master/Gruntfile.js),
[QUnit Gruntfile.js](https://github.com/jquery/qunit/blob/master/Gruntfile.js),

### Tutorials

[Bulding library with Grunt](http://meri-stuff.blogspot.com/2013/06/building-javascript-library-with-gruntjs.html)

[Getting started tutorial](http://www.justinmccandless.com/blog/A%20Tutorial%20for%20Getting%20Started%20with%20Grunt)

[Grunt boilerplate tutorial](http://integralist.co.uk/Grunt-Boilerplate.html)

## The problems

Just like Makefile, grunt uses temp files to pass source between tasks,
[example](https://github.com/bahmutov/local-angular-development/blob/master/Gruntfile.js)

* Gruntfile complexity
* disk I/O is slow

## Gulpjs

New kid on the block [gulpjs](http://gulpjs.com/)

Based on Nodejs event streams:

    var fs = require("fs");
    var zlib = require("zlib");
    fs.createReadStream("input/people.csv.gz")
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream("output/people.csv"));

## Pipeline data

    sudo npm install -g gulp
    npm install --save-dev gulp gulp-util
    // gulpfile.js
    var gulp = require('gulp');
    gulp.task('default', function(){
        gulp.src('./client/templates/*.jade')
            .pipe(jade())
            .pipe(minify())
            .pipe(gulp.dest('./build/minified_templates'));
    });

## Grunt vs Gulp

Good comparison [post](http://jaysoo.ca/2014/01/27/gruntjs-vs-gulpjs/).
Due to lower I/O Gulp is much faster.

Grunt 0.5 will introduce streams.

---
![grunt flow](https://raw2.github.com/bahmutov/talks/master/images/grunt-flow.png)

---
![gulp flow](https://raw2.github.com/bahmutov/talks/master/images/gulp-flow.png)

## The End

**[Grunt](http://gruntjs.com/)**

* simple, quick, easy
* all the tools (plugins) for front end development
* great API for writing plugins
* does NOT manage dependencies
  * use [npm](https://npmjs.org/), [bower](http://bower.io/), [jspm](http://jspm.io/)

---

![get your grunt on](https://raw2.github.com/bahmutov/talks/master/images/grunt-on.png)


[slides-now-footer]: "Grunt"
[slides-now-theme]: "bw"
[slides-now-timer]: "45"
