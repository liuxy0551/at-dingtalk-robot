import request from '@/utils/request'

export function getAtRecords(params) {
  return request({
    url: '/atRecord/getAtRecords',
    method: 'get',
    params
  })
}

export function reSendAt(data) {
  return request({
    url: '/atRecord/reSendAt',
    method: 'post',
    data
  })
}
