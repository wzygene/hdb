import axios from 'axios'

const url = {
  getPlan: 'puton/list',
  getDetail: 'puton/detail'
}

// 计划管理：获取计划列表
export function getPlan (ops) {
  return axios.get(url.getPlan, ops).then(res => {
    return Promise.resolve(res)
  })
}

// 计划管理：查看计划明细
export function getDetail (ops) {
  return axios.get(url.getDetail, ops).then(res => {
    return Promise.resolve(res)
  })
}
