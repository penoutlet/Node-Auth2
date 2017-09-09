'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'staging';
var config    = require('./../config/config.json')
// var config    = require(path.join(__dirname,'..','config', 'config.json'))[env];
var db        = {};
console.log(config);

var sequelize = new Sequelize(config.staging.username, config.staging.password, {
config.staging.host, config.staging.Dialect)

});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(sambook) {
  if (db[sambook].associate) {
    db[sambook].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
