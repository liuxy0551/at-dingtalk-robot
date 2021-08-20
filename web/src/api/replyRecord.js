import request from '@/utils/request'

export function getReplyRecords(params) {
  return request({
    url: '/replyRecord/getReplyRecords',
    method: 'get',
    params
  })
}
