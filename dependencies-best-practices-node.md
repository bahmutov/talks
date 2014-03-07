# Dependencies: best practices for Nodejs

> If I have seen further it is by standing on the
> sholders of (tiny) giants
>                               Sir Isaac Newton

## It depends

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

[slides-now-footer]: "@bahmutov"
[slides-now-theme]: "full"
