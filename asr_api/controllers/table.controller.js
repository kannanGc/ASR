var service = require('../services');
var nestjs = require('nesthydrationjs')();
var maps = require('../resultmap');

/*
Get tables 
POST : /api/getTables
*/
exports.getTables = function (req, res, next) {
    service.table.getTables(function (err, data) {
        if (err) return next(err, null);

        res.send(data);
        next();
    });
}

/*
Get table and references
GET : /api/getDatatypesAndConditions
*/

exports.getFilters = function (req, res, next) {
    service.table.getFilters(function (err, data) {
        if (err) return next(err, null);

        var mappedResult = nestjs.nest(data, maps.filter);
        res.send(mappedResult);
        next();
    })
}