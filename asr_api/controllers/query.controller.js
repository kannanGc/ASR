var service = require('../services');

/*
Get properties 
POST : /api/executequery
*/

exports.executeQuery = function (req, res, next) {
    service.table.getReferences(req.body.tables, function (err, data) {
        if (err) return next(err, null);

        //TODO : Multi-hierarchy levels should be moved into async tasks pattern.
        service.query.prepareQuery(req.body, data, function (err, data) {
            if (err) return next(err);

            data
                .then(function (result) {
                    res.send({ result: result, sql: data.toSQL().sql });
                    return next();
                })
                .catch(function (err) {
                    return next(err);
                })
                .finally(function () {
                    //TODO : Close connection if any    
                })
        });

    });
}