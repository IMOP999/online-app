// 路由配置
import Vue from 'vue'

// 导入路由模块
import VueRouter from 'vue-router'
// 安装路由插件
Vue.use(VueRouter)

import routes from './routes'
// 引入 store
import store from '@/store/index'

// 重写 push 或 replace 方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写 push 方法
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
// 重写 replace 方法
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

// 实例化路由对象
const router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 代表滚动条在最上方
    return { y: 0 }
  }
})

// 全局前置守卫，在路由跳转之间进行判断
router.beforeEach(async (to, from, next) => {
  // 用户登录了才会有 token
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name

  if (token) {
    // 登录成功，不可以再转到 login 界面
    if (to.path === '/login' || to.path === '/register') {
      next('/home')
      console.log('登录成功，已登录，返回首页')
    } else {
      // 登录了，去的不是 login 页面
      if (name) {
        // 存在用户名
        next()
        console.log('登录成功，前往xx页面，用户信息已存在')
      } else {
        // 没有用户信息，派发 action 让仓库存储用户信息再跳转
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo')
          next()
          console.log('登录成功，前往xx页面，已获取用户信息')
        } catch (error) {
          // token 过期，获取不到用户信息，重新登录
          // 消除 token
          await store.dispatch('userLogOut')
          next('/login')
        }
      }
    }
  } else {
    // 未登录
    // 不能去 trade pay paysuccess center
    if (to.path.indexOf('/trade') !== -1 || to.path.indexOf('/pay') !== -1 || to.path.indexOf('/center') !== -1) {
      next(`/login?redirect=${to.path}`)
    } else {
      // 可以去 home search shopcart
      next()
      console.log('未登录')
    }
  }
})

export default router
