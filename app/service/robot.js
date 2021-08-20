const { Op } = require('sequelize')
const db = require('../utils/db')
const { getUuid, getNow, getWhere, setCtxBody, getPage, getExclude, getInclude } = require('../utils')

class RobotService {
  // 创建
  async createRobot (ctx) {
    try {
      const robotId = getUuid()
      const { name, appKey, appSecret, apiUrl, note } = ctx.request.body
      await db.Robot.create({ robotId, name, appKey, appSecret, apiUrl, note })
      return setCtxBody(200, robotId, '保存成功')
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 编辑
  async updateRobot (ctx) {
    try {
      const { robotId, name, appKey, appSecret, apiUrl, note } = ctx.request.body
      await db.Robot.update({ name, appKey, appSecret, apiUrl, note }, { where: getWhere({ robotId }) })
      return setCtxBody(200, robotId, '保存成功')
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 删除
  async deleteRobot (ctx) {
    try {
      const { robotId } = ctx.request.body
      await db.Robot.update({ isDelete: 1 }, { where: getWhere({ robotId }) })
      return setCtxBody(200, robotId, '删除成功')
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 获取列表
  async getRobots (ctx) {
    try {
      const { offset, limit, page, pageSize } = getPage(ctx.query)
      const { name = '', appKey = '' } = ctx.query
      let where = getWhere()
      name && (where.name = { [Op.substring]: name })
      appKey && (where.appKey = appKey)

      const { count, rows } = await db.Robot.findAndCountAll({
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
      return setCtxBody(200, { rows, total: count, page, pageSize })
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }
}

module.exports = new RobotService()
