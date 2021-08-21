const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ReplyRecord', {
    replyRecordId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      comment: "回复记录表id"
    },
    isDelete: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除 0 未删除，1 已删除"
    },
    url: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "回复内容的推送 URL"
    },
    msg: {
      type: DataTypes.STRING(3000),
      allowNull: true,
      comment: "回复内容的 JSON 字符串"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "群名称"
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "更新时间"
    }
  }, {
    sequelize,
    tableName: 'ReplyRecord',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "replyRecordId" },
        ]
      },
    ]
  });
};
