import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getUserInfo(data) {
  return request({
    url: '/user/getInfo',
    method: 'post',
    data
  })
}
