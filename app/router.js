/**
 * 模块化处理router
 */
const Router = require('koa-router')
const { getVersion } = require('./utils')
const AtRobotController = require('./controller/atRobot')
const RobotController = require('./controller/robot')
const AtRecordController = require('./controller/atRecord')
const ReplyRecordController = require('./controller/replyRecord')

const router = new Router()

/**
 * 启动路由
 * allowedMethods, 在所有路由中间件最后调用, 此时根据 ctx.status 设置 response 响应头
 */
module.exports = app => {
  // 验证消息的确来自微信服务器
  router.get('/', ctx => { ctx.body = `hello at-dingtalk-robot, v${ getVersion() }` })
  router.get('/api', ctx => { ctx.body = `hello at-dingtalk-robot, v${ getVersion() }` })
  
  router.post('/api/atRobot', AtRobotController.atRobot)

  router.post('/api/robot/createRobot', RobotController.createRobot)
  router.post('/api/robot/updateRobot', RobotController.updateRobot)
  router.post('/api/robot/deleteRobot', RobotController.deleteRobot)
  router.get('/api/robot/getRobots', RobotController.getRobots)

  router.post('/api/atRecord/reSendAt', AtRecordController.reSendAt)
  router.get('/api/atRecord/getAtRecords', AtRecordController.getAtRecords)
  router.post('/api/replyRecord/createReplyRecord', ReplyRecordController.createReplyRecord)
  router.get('/api/replyRecord/getReplyRecords', ReplyRecordController.getReplyRecords)

  app.use(router.routes(), router.allowedMethods())
}
