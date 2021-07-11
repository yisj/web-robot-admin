import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/robot/list',
    method: 'get',
    params: query
  })
}

export function fetchRobot(id) {
  return request({
    url: '/vue-element-admin/robot/detail',
    method: 'get',
    params: { id }
  })
}

export function createRobot(data) {
  return request({
    url: '/vue-element-admin/robot/create',
    method: 'post',
    data
  })
}

export function updateRobot(data) {
  return request({
    url: '/vue-element-admin/robot/update',
    method: 'post',
    data
  })
}
