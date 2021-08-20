import request from '@/utils/request'

export function createRobot(data) {
  return request({
    url: '/robot/createRobot',
    method: 'post',
    data
  })
}

export function updateRobot(data) {
  return request({
    url: '/robot/updateRobot',
    method: 'post',
    data
  })
}

export function deleteRobot(data) {
  return request({
    url: '/robot/deleteRobot',
    method: 'post',
    data
  })
}

export function getRobots(params) {
  return request({
    url: '/robot/getRobots',
    method: 'get',
    params
  })
}
