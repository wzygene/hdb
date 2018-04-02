import axios from 'axios'

const url = {
  getList: '/data/list'
}

// 数据管理：获取数据
export function getList (ops) {
  console.log(ops)
  console.log(url.getList)
  return axios.get(url.getList, ops).then(res => {
    return Promise.resolve(res)
  })
}
