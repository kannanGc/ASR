var model = require('../models');
var async = require('async');
var queryutil = require('../sqlutil/query.js');

//Get tables
exports.prepareQuery = function (queryobj, paramrelationships, callback) {

    var asyncTasks = [];

    var knexquery = model.knex;
    var tables = queryobj.tables;
    var fields = queryobj.fields;
    var conditions = queryobj.conditions;

    var relationships = paramrelationships;

    asyncTasks.push(function (callback) {
        //Build joins
        queryutil.buildJoinCondition(tables, relationships, knexquery, callback);
    });

    asyncTasks.push(function (paramknexquery, callback) {
        //Build conditions
        queryutil.buildConditions(conditions, paramknexquery, callback);
    });

    asyncTasks.push(function (paramknexquery, callback) {
        //Build select
        queryutil.buildSelect(fields, paramknexquery, callback);
    });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err, data);
        else return callback(null, data);
    });
}