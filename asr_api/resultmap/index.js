var fs = require('fs');
var maps = {};

fs.readdirSync(__dirname).forEach(function(file) {
	if (file == "index.js") return;
	var name = file.substr(0, file.indexOf('.'));
	maps[name] = require('./' + file);
});

module.exports = maps;
