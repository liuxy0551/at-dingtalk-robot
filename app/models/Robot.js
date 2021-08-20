const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Robot', {
    robotId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      comment: "机器人表id"
    },
    isDelete: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除 0 未删除，1 已删除"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "机器人名称"
    },
    appKey: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "机器人 AppKey"
    },
    appSecret: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "机器人 AppSecret"
    },
    apiUrl: {
      type: DataTypes.STRING(512),
      allowNull: true,
      comment: "验证消息来自钉钉后接收消息的地址"
    },
    note: {
      type: DataTypes.STRING(512),
      allowNull: true,
      comment: "备注"
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
    tableName: 'Robot',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "robotId" },
        ]
      },
    ]
  });
};
