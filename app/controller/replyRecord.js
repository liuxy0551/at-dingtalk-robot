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

  // 新增
  async createReplyRecord (ctx) {
    try {
      ctx.body = await ReplyRecordService.createReplyRecord(ctx)
    } catch (error) {
      ctx.body = error
    }
  }
}

module.exports = new ReplyRecordController()
