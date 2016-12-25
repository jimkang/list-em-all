list-em-all
==================

Lists projects (or whatever you want, really) filtered by tags.

<img src="http://jimkang.com/list-em-all/list-em-all-screenshot.png" width="547" />

Installation
--------

    npm install --save list-em-all

API
---

This module provides two functions:

- `loadList({url, yamlParseFn}, done)`, which takes a url, an optional yamlParseFn, like [yamljs.parse](https://www.npmjs.com/package/yamljs) or [js-yaml's `safeLoad`](https://www.npmjs.com/package/js-yaml). If you don't provide that opt, it will just use yamljs. It will load the yaml file at the url, which should have a [structure like this](http://jimkang.com/list-em-all/data/test.yaml) and pass it back to the callback as an array. The callback signature should be `(error, array)`.

- `render({thingList, rootId, thingClass, onTagClick})`, which takes:

  - A `thingList` array (if you're using `loadList`, it's just the array that was passed back to the callback)
  - The `rootId`, the id of the DOM element under which the list should be rendered.
  - `thingClass`, the CSS class that should be added to each list item DOM element that is rendered for each thing in `thingList`.
  - `onTagClick`, an optional callback that will be called each time a DOM element showing a tag is clicked. The callback will be passed the tag, which is a string.

`render` is reentrant. You can call it multiple times with different `thingList`s, and it will handle removing the DOM elements representing things that are no longer in the list, adding DOM elements for things that are new to the list, and updating values for existing things in the list that have changed via [d3-selection](https://github.com/d3/d3-selection).

[Here is an example that uses this module without any styling.](http://jimkang.com/list-em-all/unstyled.html#dataURL=http%3A%2F%2Fjimkang.com%2Flist-em-all%2Fdata%2Ftest.yaml) You can choose to apply any CSS you want to make your list render however you want. [Here is an example that does have styling.](http://jimkang.com/list-em-all/styled.html#dataURL=http%3A%2F%2Fjimkang.com%2Flist-em-all%2Fdata%2Ftest.yaml)

[Code for those example apps.](https://github.com/jimkang/list-em-all/blob/gh-pages/app.js)

The reason it's not a single function that's just "do it for me," is that it gives you the flexibility to filter or otherwise alter the loaded list before rendering, or to not load a list from YAML at all and just build it however you want.

Format
------

The list elements need to each have the following properties:

  - name
  - description
  - urls (a list, each element of which has a `name` and a `url`)

Optional:

  - image
  - tags

Why
----

At least two times, I've need to write an app that shows a simple filterable list that's heavy on the text, which may contain linebreaks. This is a nice lightweight way to do it. The data format is in YAML because writing it by hand is a lot less than writing JSON.

Development
------------

First, install Node. Then:

    npm install
    npm install wzrd -g

    make run    

Then, wzrd will say something like:

    wzrd index.js
    server started at http://localhost:9966

You can open your browser to that.

Run `make lint` before committing.

License
-------

The MIT License (MIT)

Copyright (c) 2016 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
