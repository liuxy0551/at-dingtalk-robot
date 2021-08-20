const axios = require('axios')
const { setCtxBody, getNow } = require('../utils')

class AtRobotService {
  // 在钉钉群里艾特企业内部机器人时接收钉钉推送的消息
  async atRobot (ctx, apiUrl, robotName) {
    try {
      const { text, senderNick } = ctx.request.body
      console.log(getNow(), `${ robotName }, ${ senderNick }, ${ text.content.replace(/^\s*|\s*$/g, '') }`)

      const { status, data } = await axios.post(apiUrl, ctx.request.body)
      const result = { status, body: ctx.request.body, data }
      
      data.code !== 200 && console.log(getNow(), `${ robotName }, ${ senderNick }, ${ text.content.replace(/^\s*|\s*$/g, '') }`, result)
      return setCtxBody(200, result)
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }
}

module.exports = new AtRobotService()
