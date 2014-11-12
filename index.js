var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var _ = require('lodash');

module.exports = function(options) {
	options = _.defaults(options || {}, {
		'format': 'json' /* json | plain */
	});

	if (typeof options.format !== 'string') {
		throw new PluginError('Requires format to be a string');
 	}
 	if (options.format !== 'json' && options.format !== 'plain') {
 		throw new PluginError('Requires format to be \'json\' or \'plain\'');
 	}

	options = _.defaults(options, {
		'ext': (options.format === 'plain' ? '.rev' : '.rev.json')
	});

	if (typeof options.ext !== 'string') {
		throw new PluginError('Requires ext to be a string');
 	}

	return through.obj(function(file, enc, cb) {
		this.push(file);

		/* Only handle revved files */
		if (file.revOrigPath) {
			var contents;
			if (options.format === 'plain') {
				contents = new Buffer(path.basename(file.path));
			} else {
				contents = new Buffer(JSON.stringify({'rev': path.basename(file.path)}));
			}

			this.push(new gutil.File({
				cwd: file.cwd,
				base: file.base,
				path: path.join(file.base, path.join(path.dirname(file.relative), path.basename(file.revOrigPath)) + options.ext),
				contents: contents,
				stat: file.stat
			}));
		}

		cb();
	}, function(cb) {
		cb();
	});
};
