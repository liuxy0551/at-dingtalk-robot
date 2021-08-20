const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AtRecord', {
    atRecordId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
      comment: "@ 记录表id"
    },
    isDelete: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除 0 未删除，1 已删除"
    },
    appKey: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "机器人 AppKey"
    },
    robotName: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "机器人名称"
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      comment: "消息文本"
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "消息的时间"
    },
    conversationType: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "单聊, 群聊"
    },
    conversationTitle: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "群聊时才有的会话标题"
    },
    senderId: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "加密的发送者ID。说明 使用senderStaffId，作为发送者userid值"
    },
    senderStaffId: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "企业内部群中@该机器人的成员userid。说明 该字段在机器人发布线上版本后，才会返回"
    },
    senderNick: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "发送者昵称"
    },
    senderCorpId: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "企业内部群有的发送者当前群的企业corpId"
    },
    sessionWebhook: {
      type: DataTypes.STRING(400),
      allowNull: true,
      comment: "当前会话的Webhook地址"
    },
    sessionWebhookExpiredTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "当前会话的Webhook地址过期时间"
    },
    isAdmin: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "是否为管理员"
    },
    chatbotUserId: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "加密的机器人ID"
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
    tableName: 'AtRecord',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "atRecordId" },
        ]
      },
    ]
  });
};
