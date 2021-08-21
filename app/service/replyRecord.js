const { Op } = require('sequelize')
const db = require('../utils/db')
const { getUuid, getNow, getWhere, setCtxBody, getPage, getExclude, getInclude } = require('../utils')

class ReplyRecordService {
  // 创建
  async createReplyRecord (ctx) {
    try {
      const replyRecordId = getUuid()
      const { url, msg, name } = ctx.request.body
      const replyRecord = { replyRecordId, url, msg, name }
      await db.ReplyRecord.create(replyRecord)
      return setCtxBody(200, replyRecordId, '保存成功')
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 获取列表
  async getReplyRecords (ctx) {
    try {
      const { offset, limit, page, pageSize } = getPage(ctx.query)
      const { msg = '', startDate = '', endDate = '' } = ctx.query
      let where = getWhere()
      startDate && endDate && (where.createTime = { [Op.between]: [startDate, endDate] })
      msg && (where.msg = { [Op.substring]: msg })

      const { count, rows } = await db.ReplyRecord.findAndCountAll({
        where,
        order: [['updateTime', 'DESC']],
        attributes: {
          exclude: getExclude(),
          include: getInclude()
        },
        offset,
        limit,
        raw: true
      })
      return setCtxBody(200, { rows: rows.map(item => {
        return {
          ...item,
          msg: JSON.parse(item.msg || '{}')
        }
      }), total: count, page, pageSize })
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }
}

module.exports = new ReplyRecordService()
