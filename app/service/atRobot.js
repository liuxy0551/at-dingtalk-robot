const axios = require('axios')
const { setCtxBody, getNow } = require('../utils')

class AtRobotService {
  // 把验证过的钉钉消息推送给开发者
  async sendToDeveloper (body, apiUrl, robotName) {
    try {
      const { text, senderNick } = body
      console.log(getNow(), `${ robotName }, ${ senderNick }, ${ text.content.replace(/^\s*|\s*$/g, '') }`)

      const { status: code, data = { data: { data: { data: [] } } } } = await axios.post(apiUrl, body)
      const result = { code, data: { result: data.data.data[0] || '', body } }

      data.code !== 200 && console.log(getNow(), `${ robotName }, ${ senderNick }, ${ text.content.replace(/^\s*|\s*$/g, '') }`, data.code, result)
      return result
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }
}

module.exports = new AtRobotService()
