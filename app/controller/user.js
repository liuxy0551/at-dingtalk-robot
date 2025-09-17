const UserService = require('../service/user')

class UserController {
  // 登录
  async login (ctx) {
    try {
      ctx.body = await UserService.login(ctx)
    } catch (error) {
      ctx.body = error
    }
  }

  // 获取用户信息
  async getUserInfo (ctx) {
    try {
      ctx.body = await UserService.getUserInfo(ctx)
    } catch (error) {
      ctx.body = error
    }
  }
}

module.exports = new UserController()
