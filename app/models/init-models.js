var DataTypes = require("sequelize").DataTypes;
var _AtRecord = require("./AtRecord");
var _ReplyRecord = require("./ReplyRecord");
var _Robot = require("./Robot");

function initModels(sequelize) {
  var AtRecord = _AtRecord(sequelize, DataTypes);
  var ReplyRecord = _ReplyRecord(sequelize, DataTypes);
  var Robot = _Robot(sequelize, DataTypes);


  return {
    AtRecord,
    ReplyRecord,
    Robot,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
