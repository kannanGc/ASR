var service = require('../services');
var nestjs = require('nesthydrationjs')();
var maps = require('../resultmap');

/*
Get tables 
POST : /api/getReports
*/
exports.getReports = function (req, res, next) {
    //var userId = req.query.userId; //TODO : User id should be taken from token.
    // var userId = "Nimble 2";
      var userId = req.params.uid;
    console.log("userId is"+ userId);
    service.report.getReports(userId, function (err, data) {
        if (err) return next(err, null);

        var mappedResult = nestjs.nest(data, maps.report);
        res.send(mappedResult);
        next();
    });
}

/*
Get tables 
POST : /api/getReportData
*/
exports.getReportData = function (req, res, next) {
    var reportId = req.params.reportid; //TODO : Report id should be validated against user access, since it is coming via query string

    service.report.getReportData(reportId, function (err, data) {
        if (err) return next(err, null);
        res.send(data[0]); // TODO: [0] should be removed. sequelize find() should be used.
        next();
    });
}

/*
Save reports 
POST : /api/saveReports
*/
exports.saveReports = function (req, res, next) {
    var reortData = req.body;
    service.report.saveNewReport(reortData,function (err, data) {
        if (err){
          return next(err);  
        } 

        res.send({"reportId":data});
        return next();
    });
}