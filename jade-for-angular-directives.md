# Jade for Angular Directives

## HTML template in angular directive

```js
// hello-world.js
angular.module('helloWorld', [])
  .directive('helloWorld', function () {
    return {
      templateUrl: 'hello-world.tpl.html'
    };
  });
```

```html
<!-- hello-world.tpl.html -->
<div class="hello-world">
  <span class="message">Hello World!</span>
</div>
```

## Avoid Ajax request for template file

Compile HTML template file into JavaScript using
[grunt-html2js](https://github.com/karlgoldstein/grunt-html2js)

```js
// Gruntfile.js
html2js: {
  main: {
    options: {
      base: 'src',
      module: 'hello-world.templates'
    },
    src: [ 'hello-world.tpl.html' ],
    dest: 'tmp/hello-world.templates.js'
  }
}
```

Then concatenate `tmp/hello-world.templates.js` with `directive.js`.

## hello-world.templates.js

```js
angular.module('hello-world.templates', ['hello-world.tpl.html']);

angular.module("hello-world.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("hello-world.tpl.html",
    "<div class=\"hello-world\">\n" +
    "  <span class=\"message\">Hello World!</span>\n" +
    "</div>\n");
  });
```

## Jade template

hello-world.tpl.jade

```jade
.hello-world
  span.message Hello World!
```

## Selectors are special

HTML treats all attributes the same

    <div id="foo" class="button important tooltip"
         width="200" height="50">Click me</div>

Jade treats ID and class attributes specially because they are used mostly
to address elements

    #foo.button.important.tooltip (width=200, height=50) Click me

The syntax allows to quickly see the structure of the page.

## Include HTML

You can always include plain html inside jade

    p.
      This is a <strong>paragraph</strong>
      Continues on next <a href="somewhere">line</a>
    script(src="foo.js")

You can even include JavaScript inside jade. Please don't.

    script.
      if (foo) {
         bar(1 + 5)
      }

## Plays nicely with angular

    #foo.button(ng-class="specialClas()") Click me

    p.
      This is multiline text
      Hello {{ name }}!

where `name` is attached to the scope.

## Jade is to HTML

* CoffeeScript to JavaScript
* Markdown to HTML
* JSON to XML
* Python to ?

[Jade syntax docs](http://naltatis.github.io/jade-syntax-docs/)

## Start using today

If your directive's template filename ends in `.jade` then grunt-html2js
will compile it from Jade to HTML first, then to JavaScript.

We can write our directives with less boilerplate text and fewer
"I forgot to close the div" errors.

## Related

* [Jade templates for Angular directives](http://bahmutov.calepin.co/jade-templates-for-angular-directives.html)
* [AngularJs inside Jade templates](http://bahmutov.calepin.co/angularjs-inside-jade-templates.html)

### author

Follow Gleb Bahmutov [@twitter](https://twitter.com/bahmutov),
see his projects at [glebbahmutov.com](http://glebbahmutov.com/)
