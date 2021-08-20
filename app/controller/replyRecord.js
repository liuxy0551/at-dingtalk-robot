const ReplyRecordService = require('../service/replyRecord')

class ReplyRecordController {
  // 获取列表
  async getReplyRecords (ctx) {
    try {
      ctx.body = await ReplyRecordService.getReplyRecords(ctx)
    } catch (error) {
      ctx.body = error
    }
  }
}

module.exports = new ReplyRecordController()
