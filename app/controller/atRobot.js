const AtRobotService = require('../service/atRobot')
const AtRecordService = require('../service/atRecord')
const { getWhere, getAtSign, getNow } = require('../utils')
const db = require('../utils/db')

class AtRobotController {
  // 在钉钉群里 @ 企业内部机器人时接收钉钉推送的消息，验证中心
  async atRobot (ctx) {
    try {
      // 根据机器人的 appKey 从数据库查询 appSecret
      const { appKey } = ctx.query
      if (!appKey) throw { code: 401, message: '需要 appKey' }
      const { name, appSecret, apiUrl } = await db.Robot.findOne({
        where: getWhere({ appKey }),
        raw: true
      })

      // 校验是否从钉钉推送来的消息
      const { sign, timestamp } = ctx.request.header
      await AtRobotController.checkIsDingtalk(appSecret, sign, timestamp)

      // 往数据库存 @ 记录
      AtRecordService.createAtRecord(appKey, name, ctx.request.body)

      ctx.body = await AtRobotService.sendToDeveloper(ctx.request.body, apiUrl, name)
    } catch (error) {
      console.log(getNow(), error)
      ctx.body = error
    }
  }

  // 检查消息是否来自钉钉的合法请求
  // https://developers.dingtalk.com/document/app/develop-enterprise-internal-robots/title-cq2-u4g-s7j
  static async checkIsDingtalk (appSecret, sign, timestamp) {
    return new Promise((resolve, reject) => {
      const atSign = getAtSign(appSecret, timestamp)
      if (Math.abs(timestamp - new Date().getTime()) > 60 * 60 * 1000) reject('时间差距大于 1 小时')
      if (sign !== atSign) reject('签名错误')
      resolve()
    })
  }
}

module.exports = new AtRobotController()
