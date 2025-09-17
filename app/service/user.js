const { setCtxBody } = require('../utils')

class UserService {
  // 登录
  async login (ctx) {
    // 写死 token
    const tokens = {
      admin: 'admin-token'
    }

    try {
      const { username, password } = ctx.request.body
      const token = tokens['admin']

      return setCtxBody(200, { username, token }, '登录成功')
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

  // 获取用户信息
  async getUserInfo (ctx) {
    // 写死用户名密码
    const users = {
      'admin-token': {
        roles: ['admin'],
        introduction: 'I am a administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Admin'
      },
    }

    const {token} = ctx.request.body
    const userInfo = users[token]

    try {
      return setCtxBody(200, userInfo, '成功')
    } catch (error) {
      return setCtxBody(500, error, '系统错误')
    }
  }

}

module.exports = new UserService()
