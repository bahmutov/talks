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
// hello-world.tpl.html
<div class="hello-world">
  <span class="message">Hello World!</span>
</div>
```

### author

Follow Gleb Bahmutov [@twitter](https://twitter.com/bahmutov),
see his projects at [glebbahmutov.com](http://glebbahmutov.com/)
