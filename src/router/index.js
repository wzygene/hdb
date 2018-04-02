import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'
// import * as types from '../store/mutation-types'

const Login = resolve => require(['@/components/branch/login'], resolve)
const DataGovern = resolve => require(['@/components/branch/data-govern'], resolve)
const PlanGovern = resolve => require(['@/components/branch/plan-govern'], resolve)
const EditPlan = resolve => require(['@/components/branch/edit-plan'], resolve)

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/dataGovern'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dataGovern',
    name: 'dataGovern',
    meta: {
      requireAuth: true
    },
    component: DataGovern
  },
  {
    path: '/planGovern',
    name: 'planGovern',
    meta: {
      requireAuth: true
    },
    component: PlanGovern
  },
  {
    path: '/editPlan',
    name: 'editPlan',
    meta: {
      requireAuth: true
    },
    component: EditPlan
  }
]

// 页面刷新时，重新赋值token
// if (window.localStorage.getItem('Token')) {
//   console.log(window.localStorage.getItem('Token'))
//   store.commit(types.LOGIN, window.localStorage.getItem('Token'))
// }

// 创建路由实例
const router = new Router({
  routes
})

// 路由分发前 判断账户信息是否存在
router.beforeEach((to, from, next) => {
  next()
  // if (to.matched.some(r => r.meta.requireAuth)) {
  //   if (store.state.Token) {
  //     next()
  //   } else {
  //     next({
  //       path: '/login',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     })
  //   }
  // } else {
  //   next()
  // }
})

export default router
