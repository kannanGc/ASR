var model = require('../models');
var async = require('async');

//Get tables
exports.getReports = function (loggedinUser, callback) {
    model.Report
        .findAll({
            attributes: ['reportid', 'reportname', 'type'],
            where: {
                $or: [{'createdBy': loggedinUser},{'Type': "Public"}]
            },
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

exports.getReportData = function (reportId, callback) {
    model.Report
        .findAll({
            attributes: ['reportid', 'reportname', 'type'],
            where: { reportid: reportId }, // Note : since the report id is query string, Userid has been checked to make sure that it is created by the same requested user.
            include: [
                {
                    model: model.ReportColumn,
                    attributes: ['columnId', 'reportId', 'tableName', 'columnName', 'alias', 'aggregate']

                },
                {
                    model: model.ReportCondition,
                    attributes: ['conditionId', 'reportId', 'tableName', 'columnName', 'filter', 'filterValue', 'type']

                }
            ]
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

exports.saveNewReport = function (reportData,callback) {
    var asyncTasks = [];
 
console.log(reportData.report.reportName);
   

    //reportData.report.createdBy = reportData.report.createdBy;//TODO : Take user id from token.
    //reportData.report.updatedBy = reportData.report.updatedBy;//TODO : Take user id from token.

    console.log(reportData.updatedBy);
    console.log(reportData.createdBy);
    // create or update report
    asyncTasks.push(function (callback) {

console.log(reportData.report.type + " Type =>>>>.");
    if (typeof reportData.report.reportId != 'undefined'){
       return callback(null, reportData);  
    } 
    else{
        model.Report
        .count({
            attributes: [ 'reportName'],
            where: { 
            reportName: reportData.report.reportName ,
            createdBy:  reportData.report.updatedBy, 
            type:  reportData.report.type

            }// Note : since the report id is query string, Userid has been checked to make sure that it is created by the same requested user.
            
        })
        .then(function (count) {
            console.log(count + " is the count");
            if(count > 0){
                callback({ type: "validation", error: "ReportNameALreadyPresent"}, null);
            }else{
                 

                model.Report.create(reportData.report)
                    .then(function (data) {
                     reportData.report.reportId = data.reportId;
                     callback(null, reportData);
                });
                
            }
           // callback(null, data);
        })
        .catch(function (err) {
            return callback(err, null);
        })
        .finally(function () {
            //TODO : close connections if any
        });
 
    }
       
        
    });

    // create or update fields
    if (typeof reportData.fields != 'undefined' && reportData.fields.length > 0)
        asyncTasks.push(function (reportData, callback) {
            var fields = reportData.fields;

            for (var index in fields) {
                fields[index].reportId = reportData.report.reportId;
                fields[index].createdBy = reportData.report.createdBy;
                fields[index].updatedBy = reportData.report.updatedBy;
            }

            model.ReportColumn.bulkCreate(fields,
                {
                    ignoreDuplicates: true,
                    updateOnDuplicate: ['columndId', 'alias', 'aggregate', 'updatedAt', 'updatedBy']
                })
                .then(function () {
                    callback(null, reportData);
                });
        });

    // create or update conditions
    if (typeof reportData.conditions != 'undefined' && reportData.conditions.length > 0)
        asyncTasks.push(function (reportData, callback) {
            var conditions = reportData.conditions;
            for (var index in conditions) {
                var conditon = conditions[index];

                conditon.reportId = reportData.report.reportId;
                conditon.createdBy = reportData.report.createdBy; //TODO : Take user id from token.
                conditon.updatedBy = reportData.report.updatedBy; //TODO : Take user id from token.
                conditon.filterValue = (conditon.filter == 'between' || conditon.filter == 'in') ? conditon.filterValue.join(',') : conditon.filterValue; //TODO : once ui control added for array and date, this part needs to be changed.
            }
            model.ReportCondition.bulkCreate(conditions,
                {
                    ignoreDuplicates: true,
                    updateOnDuplicate: ['conditionId', 'filter', 'filterValue', 'type', 'updatedAt', 'updatedBy']
                })
                .then(function () {
                    callback(null, reportData);
                });
        });

    // delete fields
    if (typeof reportData.columnsToDel != 'undefined' && reportData.columnsToDel.length > 0)
        asyncTasks.push(function (reportData, callback) {
            model.ReportColumn.destroy({ where: { columnId: reportData.columnsToDel } })
                .then(function () {
                    callback(null, reportData);
                });
        });

    // delete conditions
    if (typeof reportData.conditionsToDel != 'undefined' && reportData.conditionsToDel.length > 0)
        asyncTasks.push(function (reportData, callback) {
            model.ReportCondition.destroy({ where: { conditionId: reportData.conditionsToDel } })
                .then(function () {
                    callback(null, reportData);
                });
        });

    async.waterfall(asyncTasks, function (err, data) {
        if (err) return callback(err,null);
        console.log(data.report);
        callback(null,data.report.reportId);
    });
}
