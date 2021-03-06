var fs = require('fs');

module.exports = function (app, routes, authenticate) {
    fs.readdirSync(__dirname).forEach(function (file) {
        if (file === "index.js" || file.substr(file.lastIndexOf('.') + 1) !== 'js')
            return;

        require('./' + file)(app, routes, authenticate);
    });

}