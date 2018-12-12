var winston = require('winston');
var winston_mysql = require('winston-mysql');
var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];

winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: config.exceptionlogfile,
            handleExceptions: true,
            json: true,
            colorize: false
        }),
        new winston_mysql({
            level: 'info',
            host: config.host,
            user: config.username,
            password: config.password,
            database: config.database,
            table: config.usagelogtable
        })

    ],
    exitOnError: false
});

module.exports = logger;
