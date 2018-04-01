'use strict';
require('dotenv').config();
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.js');
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

//Important for Heroku deployment
if (process.env.NODE_ENV === "production") {
  var sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB,
    username: process.env.UN,
    password: process.env.PASSWORD,
    dialect: "mysql"
  });
  console.log("using id");

} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
  console.log("using else");

}

console.log(process.env.DB_HOST);
console.log(process.env.DB);
console.log(process.env.USERNAME);


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
