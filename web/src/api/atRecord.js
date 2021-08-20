import request from '@/utils/request'

export function getAtRecords(params) {
  return request({
    url: '/atRecord/getAtRecords',
    method: 'get',
    params
  })
}
