
var fs = require('fs');
var vm = require('vm');
var path = require('path');

var filename = 'kernel.js';
var context;
var importScripts = function() {
	for (var i=0,ii=arguments.length; i<ii; i++) {
		var filename = arguments[i];
		var code = fs.readFileSync(filename, 'utf8');
		vm.runInContext(code, context, filename);
	}
};
var sandbox = {
	importScripts: importScripts,
	require: require,
	__dirname: __dirname,
	RegExp: RegExp,
	Array: Array
};
var keys = Object.keys(global);
for (var i=0,ii=keys.length; i<ii; i++) {
	var key = keys[i];
	sandbox[key] = global[key];
}
context = vm.createContext(sandbox);

var fullFilename = path.join(__dirname, "script", filename);
importScripts(fullFilename);
