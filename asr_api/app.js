var env = process.env.NODE_ENV || "development";
var port = process.env.PORT_ENV || 8081;

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var config = require('./config/config.json')[env];
var authenticate = express.Router();
var jwt = require('jsonwebtoken');
var logger = require('./logger/logger');

var app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.set('appsecretkey', config.appsecretkey);
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS');
    next();
});
try {
    //TODO: Logging - Note: It should be asyncrnous database log
    app.use(function (req, res, next) {
        var start = Date.now();
        res.on('finish', function () {
            if (res.statusCode != 500 && req.url != '/logs') {
                var duration = Date.now() - start;
                var usageDetails = {
                    header: { userid: 'will be added on security implementation' },
                    input: { method: req.method, url: req.url, body: req.body, params: req.params, query: req.query },
                    output: { responsetime: duration }
                };
                logger.log('info', req.url, { metadata: usageDetails })
            }
        });
        next();
    });

    // Authentication TODO: Move it to authentication.js
    authenticate.use(function (req, res, next) {
        
        var token = req.cookies['access-token'] || req.body.token || req.query.token || req.headers['access-token'];// Get token from header or url parameters or post parameters
        if(config.isAuthenticateRequired){
            if (token) {
                jwt.verify(token, app.get('appsecretkey'), function (err, decoded) { // decode token
                    if (err) {
                        console.log(err);
                        return res.json({ success: false, message: 'Authentication failed.' });
                    } else {
                        req.decoded = decoded;// If it is valid, save to request for use in other routes
                        return next();
                    }
                });

            } else {

                return res.status(403).send({ success: false, message: 'No token provided.' });

            }

        }else{
            return next();
        }
    });


    //Initialize all the routes
    var routes = require('./controllers');
    require('./routes')(app, routes, authenticate);

    //Exception handling 
    //TODO : Move it to exceptionhandling.js
    //TODO : Raise exception from all possible place and check it is not crashing the app
    app.use(function (err, req, res, next) {

        if (typeof err.type != 'undefined' && err.type == "validation") {
            res.status(400).send(err);
        }
        else {
            var exceptionDetails = {
                header: { userid: 'will be added on security implementation' },
                input: { method: req.method, url: req.url, body: req.body, params: req.params, query: req.query },
                stacktrace: { err: err, trace: err.stack }
            };
            if (env == "development") {
                res.status(500).send(err);
            }
            else {
                logger.log('error', req.url, { metadata: exceptionDetails });
                res.status(500).send("Internal server error.");
            }
        }

        return next();
    });
    require('winston-logs-display')(app, logger);

    app.listen(port);
    console.log('app listetning:' + port);
    console.log("JWT Authentication Status :  "+config.isAuthenticateRequired);
}
catch (ex) {
    console.log(ex);
}

module.exports = app;

