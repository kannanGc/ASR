var model = require('../models');
var async = require('async');

//Get tables
exports.getTables = function (callback) {
    var tables = [];
    var asyncTasks = [];

    model.ReportTable.findAll()
        .then(function (tabledata) {
            tabledata.forEach(function (item) {
                asyncTasks.push(function (callback) {
                    model.knex(item.tableName).columnInfo().then(function (columndata) {
                        tables.push({ table: item.tableName, columns: columndata });
                        callback(null, '');
                    });
                });
            });

            async.parallel(asyncTasks, function (err) {
                if (err) return callback(true, null);
                callback(null, tables);
            });
        }).catch(function (err) {
            return callback(err, null);
        })
        .finally(function () {
            //TODO : close connections if any
        });
}

//Get table references
exports.getReferences = function (tablenames, callback) {

    model.ReportTableReference.findAll({
        attributes: ['tablename', 'referencetablename', 'tablekey', 'referencetablekey'],
        where: { tablename: { $in: tablenames } },
        raw: true
    })
        .then(function (data) {
            callback(null, data);
        })
        .catch(function (err) {

            return callback(err, null);
        })
        .finally(function () {
            //TODO : close connections if any
        });
}

//Get data type and condition mappings
exports.getFilters = function (callback) {

    model.ReportFilter.findAll(
        {
            attributes: ['filtertype', 'filterdesc', 'filteroperator'],
            include: [{
                model: model.FilterTypeReference,
                attributes: ['sqltype']
            }],
            raw: true

        })
        .then(function (data) {
            callback(null, data);
        })
        .catch(function (err) {
            return callback(err, null);
        })
        .finally(function () {
            //TODO : close connections if any
        });
}