DROP TABLE IF EXISTS `Robot`;
CREATE TABLE `Robot` (
  `robotId` varchar(100) NOT NULL COMMENT '机器人表id',
  `isDelete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除 0 未删除，1 已删除',
  `name` varchar(100) NULL COMMENT '机器人名称',
  `appKey` varchar(200) NULL COMMENT '机器人 AppKey',
  `appSecret` varchar(200) NULL COMMENT '机器人 AppSecret',
  `apiUrl` varchar(512) NULL COMMENT '验证消息来自钉钉后推送消息的地址',
  `note` varchar(512) NULL COMMENT '备注',
  `createTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`robotId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '机器人表';


DROP TABLE IF EXISTS `AtRecord`;
CREATE TABLE `AtRecord` (
  `atRecordId` varchar(100) NOT NULL COMMENT '@ 记录表id',
  `isDelete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除 0 未删除，1 已删除',
  `appKey` varchar(200) NULL COMMENT '机器人 AppKey',
  `robotName` varchar(200) NULL COMMENT '机器人名称',
  `content` varchar(1000) NULL COMMENT '消息文本',
  `createAt` datetime NULL COMMENT '消息的时间',
  `conversationType` varchar(10) NULL COMMENT '单聊, 群聊',
  `conversationTitle` varchar(200) NULL COMMENT '群聊时才有的会话标题',
  `senderId` varchar(200) NULL COMMENT '加密的发送者ID。说明 使用senderStaffId，作为发送者userid值',
  `senderStaffId` varchar(200) NULL COMMENT '企业内部群中@该机器人的成员userid。说明 该字段在机器人发布线上版本后，才会返回',
  `senderNick` varchar(200) NULL COMMENT '发送者昵称',
  `senderCorpId` varchar(200) NULL COMMENT '企业内部群有的发送者当前群的企业corpId',
  `sessionWebhook` varchar(400) NULL COMMENT '当前会话的Webhook地址',
  `sessionWebhookExpiredTime` datetime NULL COMMENT '当前会话的Webhook地址过期时间',
  `isAdmin` varchar(10) NULL COMMENT '是否为管理员',
  `chatbotUserId` varchar(200) NULL COMMENT '加密的机器人ID',
  `createTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`atRecordId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '@ 记录表';


DROP TABLE IF EXISTS `ReplyRecord`;
CREATE TABLE `ReplyRecord` (
  `replyRecordId` varchar(100) NOT NULL COMMENT '回复记录表id',
  `isDelete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除 0 未删除，1 已删除',
  `url` varchar(200) NULL COMMENT '回复内容的推送 URL',
  `msg` varchar(3000) NULL COMMENT '回复内容的 JSON 字符串',
  `name` varchar(100) NULL COMMENT '群名称',
  `createTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`replyRecordId`) USING BTREE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '回复记录表';
