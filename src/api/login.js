import axios from 'axios'

const url = {
  login: 'http://test.customer.adxiaoguo.com/user/login',
  isLogin: 'http://test.customer.adxiaoguo.com/user/isLogin',
  logout: 'http://test.customer.adxiaoguo.com/user/logout',
  modifypwd: 'http://test.customer.adxiaoguo.com/user/modifypwd'
}

// 登陆
export function login (ops) {
  console.log(url.login)
  return axios.post(url.login, ops).then(res => {
    console.log(5678)
    return Promise.resolve(res)
  })
}

// 判断是否登陆
export function isLogin (ops) {
  return axios.post(url.isLogin, ops).then(res => {
    return Promise.resolve(res)
  })
}

// 登出
export function logout (ops) {
  return axios.post(url.logout, ops).then(res => {
    return Promise.resolve(res)
  })
}

// 修改密码
export function modifypwd (ops) {
  return axios.post(url.modifypwd, ops).then(res => {
    return Promise.resolve(res)
  })
}
