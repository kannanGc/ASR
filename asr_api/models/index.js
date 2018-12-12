var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];
var fs = require('fs');
var path = require("path");
var db = {};
var Sequelize = require("sequelize");
var sequalizeOptions = { dialect: config.dialect, host: config.host };
var sequelize = new Sequelize(config.database, config.username, config.password, sequalizeOptions);

//Initialize knex for build query
db['knex'] = require('knex')({
  client: config.dialect,
  connection: {
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
  }
});

//Initialize sequelize models and associations
fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
//db.Sequelize = Sequelize;

module.exports = db;

