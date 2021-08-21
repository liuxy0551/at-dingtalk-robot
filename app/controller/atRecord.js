const AtRecordService = require('../service/atRecord')

class AtRecordController {
  // 获取列表
  async getAtRecords (ctx) {
    try {
      ctx.body = await AtRecordService.getAtRecords(ctx)
    } catch (error) {
      ctx.body = error
    }
  }

  // 模拟重发
  async reSendAt (ctx) {
    try {
      ctx.body = await AtRecordService.reSendAt(ctx)
    } catch (error) {
      ctx.body = error
    }
  }
}

module.exports = new AtRecordController()
