const RobotService = require('../service/robot')

class RobotController {
  // 创建
  async createRobot (ctx) {
    try {
      ctx.body = await RobotService.createRobot(ctx)
    } catch (error) {
      ctx.body = error
    }
  }

  // 编辑
  async updateRobot (ctx) {
    try {
      ctx.body = await RobotService.updateRobot(ctx)
    } catch (error) {
      ctx.body = error
    }
  }

  // 删除
  async deleteRobot (ctx) {
    try {
      ctx.body = await RobotService.deleteRobot(ctx)
    } catch (error) {
      ctx.body = error
    }
  }

  // 获取列表
  async getRobots (ctx) {
    try {
      ctx.body = await RobotService.getRobots(ctx)
    } catch (error) {
      ctx.body = error
    }
  }
}

module.exports = new RobotController()
