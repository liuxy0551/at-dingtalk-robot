import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/at-dingtalk-robot/table/list',
    method: 'get',
    params
  })
}
