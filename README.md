Xontent
=======
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/herby/xontent?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

HTML templates - capture children or siblings into a document fragment and get it back later.

Quick use
----

Suppose you have this HTML:

```html
<div id="foo">
  <span>foo</span>
  bar
  <span>baz</span>
</div>
```

When you call `$('#foo').xontent()` first time, the contents
of the div is removed, inserted into `DocumentFragment` and
this `DocumentFragment` is return wrapped in jQuery object.

All subsequent calls to `$('#foo').xontent()` will return that same
`DocumentFragment` inside a jQuery object.

`<template>` tag
----

This look like HTML5 template tag - it was in fact started
from Brain Blakely's polyfill of `<template>` tag. Xontent
adopts `content` property of working template tag; so you
can use `$('#mytemplate').xontent()` as the polyfill -
in case of `<template>` not yet working in your browser,
it will just grab its contents and puts it into a `DocumentFragment`
just as for any other element.

Advanced use
----

Beyond polyfilling template tag (and allowing its functionality
to any tag), Xontent allows specifying what content should
`$el.xontent()` grab and remember and subsequenty, return.
By default, it is the contents / .content, but you can use
`data-xontent` attribute to specify a few more options:

 - `data-xontent="see selector"` When you use this form,
	`$(selector).xontent()` is adopted and returned by subsequent calls;
 - `data-xontent="until selector"` When you use this form,
 	all following siblings of an element until hitting _selector_
 	are removed and inserted into a `DocumentFragment`.
 	This is much like the jQuery `nextUntil` call, but it misses text nodes,
 	while Xontent includes every single sibling. If _selector_
 	is not present among the following siblings, all siblings until
 	the end of parent element are grabbed;
 - Any other form of `data-xontent` uses the default
 	(take the contents or `.content` in case of `<template>`).

Setting xontent (new in 0.1.0)
----

You can call `$('#foo').xontent('set', payload)` to set the payload
which `$('#foo').xontent()` will return.
The payload may be a _DocumentFragment_ itself,
or a jQuery object that encapsulates it.

AMD (new in 0.1.2)
----

You can load xontent with AMD loader such as requirejs.
If loaded via AMD, xontent installs itself to AMD-loaded jQuery.
