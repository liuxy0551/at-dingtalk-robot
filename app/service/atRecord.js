const { Op } = require('sequelize')
const db = require('../utils/db')
const AtRobotService = require('./atRobot')
const { getUuid, getNow, getWhere, setCtxBody, getPage, getExclude, getInclude } = require('../utils')

class AtRecordService {
  // 创建
  async createAtRecord (appKey, robotName, body) {
    try {
      const atRecordId = getUuid()
      const { text, createAt, conversationType, conversationTitle, senderId, senderStaffId, senderNick, senderCorpId, sessionWebhook, sessionWebhookExpiredTime, isAdmin, chatbotUserId } = body
      const atRecord = {
        atRecordId,
        appKey,
        robotName,
        content: text.content.replace(/^\s*|\s*$/g, '').slice(0, 1000),
        createAt: getNow(createAt, false),
        conversationType: ['单聊', '群聊'][Number(conversationType) - 1],
        conversationTitle,
        senderId,
        senderStaffId,
        senderNick,
        senderCorpId,
        sessionWebhook,
        sessionWebhookExpiredTime: getNow(sessionWebhookExpiredTime, false),
        isAdmin: isAdmin ? '是' : '否', 
        chatbotUserId
      }
     
      await db.AtRecord.create(atRecord)
      return setCtxBody(200, atRecordId, '保存成功')
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 获取列表
  async getAtRecords (ctx) {
    try {
      const { offset, limit, page, pageSize } = getPage(ctx.query)
      const { content = '', senderNick = '', startDate = '', endDate = '' } = ctx.query
      let where = getWhere()
      startDate && endDate && (where.createAt = { [Op.between]: [startDate, endDate] })
      content && (where.content = { [Op.substring]: content })
      senderNick && (where.senderNick = { [Op.substring]: senderNick })

      let { count, rows } = await db.AtRecord.findAndCountAll({
        where,
        order: [['updateTime', 'DESC']],
        attributes: {
          exclude: getExclude(),
          include: getInclude(['createAt', 'sessionWebhookExpiredTime'])
        },
        offset,
        limit,
        raw: true
      })
      rows = rows.map(item => {
        return {
          ...item,
          isExpired: new Date(item.sessionWebhookExpiredTime).getTime() < new Date().getTime()
        }
      })

      return setCtxBody(200, { rows, total: count, page, pageSize })
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 模拟重发
  async reSendAt (ctx) {
    try {
      // 根据机器人的 appKey 从数据库查询 appSecret
      const { appKey } = ctx.request.body
      if (!appKey) throw { code: 401, message: '需要 appKey' }
      const { name, apiUrl } = await db.Robot.findOne({
        where: getWhere({ appKey }),
        raw: true
      })
      const res = await AtRobotService.sendToDeveloper(ctx.request.body, apiUrl, name)
      return res
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }
}

module.exports = new AtRecordService()
