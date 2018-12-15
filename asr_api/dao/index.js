var model = {};
var fs = require('fs');

fs.readdirSync(__dirname).forEach(function (file) {
  if (file == "index.js") return;
  var name = file.substr(0, file.indexOf('.'));
  model[name] = require('./' + file);
});

module.exports = model;

