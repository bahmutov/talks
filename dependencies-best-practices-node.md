# Dependencies: best practices for Nodejs

> If I have seen further it is by standing on the sholders of (tiny) giants - Sir Isaac Newton

## It depends

`npm ls` - shows the dependency tree

`npm ls --parseable` - shows the dependency paths

`npm ls --parseable|sed 's/.*\/\(.*\)/\1/g'|sort|uniq|wc -l` - counts number of unique dependency modules

```notes
slides-now depends on 302 modules
gt depends on 187 modules
```

[slides-now-footer]: "@bahmutov"
[slides-now-theme]: "full"
