# lib

In your entry point…

```
require('@iarna/lib')('lib/', 'my/other/lib/')
```

Later, maybe in another library…

```
const abc = use('abc') // loads lib/abc.js or my/other/lib/abc.js or lib/abc/index.js etc
```

## DESCRIPTION

Declare intra-package library paths and load modules from them.

## SYNOPSIS

So the intent here is to save you from `require('../../../lib/foo.js')`. 
The require thing is particuarly annoying to deal with if you're moving
source files around—no one wants to have to edit their source code just
'cause they did an `mv`.

So this bit of mad science to the rescue.  It adds a new global function
called `use`.  `use` is exactly like `require` except that instead of
searching `node_modules` folders in various places it instead searches the
paths you specified when you loaded `@iarna/lib`.

And when I say it's like `require` I mean, it _is_ require, module cache and
everything.  If you `require('../../../lib/foo.js')` elsewhere you'll get
the same copy of the module.

## MAD SCIENCE

The implementation of this involves mucking about with `module.paths` and
then using `module.require` to load things.  This works great but is the
kind of thing that'll get you scowls from the folks responsible for Node
internals.

