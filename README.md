# gulp-rev-pointer

A gulp plugin to augment gulp-rev or gulp-rev-all. It creates a file using the unrevved filename that contains (points to) the revved filename.

This is used for applications that know static files by their un-revved filenames. The application can look for the un-revved filename to find the pointer, and from there find the revved file.

Pointer files may be easier to create than manifest files. Manifest files suggest that all of your assets need to be revved at the same time, whereas the pointer file is created one-to-one with the revved file.

The pointer file is either a plain text or a JSON file. It is created by appending a suffix to the original path name, by default `.rev.json`.


## Example

You have a file `js/example.js`.

You apply `gulp-rev-all` to it, producing `js/example.99c0f774.js`.

You then apply `gulp-rev-pointer`, producing `js/example.js.rev.json`, which contains `{"rev": "example.99c0f774.js"}`.

The application looks for `js/example.js`. Instead it opens `js/example.js.rev.json`, find the path to the revved file and then uses that.


## Gulp example

```javascript
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var revAll = require('gulp-rev-all');
var revPointer = require('gulp-rev-pointer');

gulp.src('js/**')
	.pipe(uglify())
	.pipe(revAll())
	.pipe(revPointer())
	.pipe(gulp.dest('build'));
```

## Options

You can pass an optional options object to the `revPointer` function.

```javascript
{
	'format': 'json',
	'ext': '.rev.json'
}
```

`format` is the format of the pointer file. Valid values are `json` and `plain`. Defaults to `json`.
`ext` is the string to append to the original filename to create the pointer file. Defaults to `.rev.json` if the format is `json` and `.rev` if the format is `plain`.

## Install

```sh
$ npm install --save-dev gulp-rev-pointer
```
