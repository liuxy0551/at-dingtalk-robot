import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/at-dingtalk-robot/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/at-dingtalk-robot/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/at-dingtalk-robot/user/logout',
    method: 'post'
  })
}
