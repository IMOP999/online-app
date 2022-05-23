import Vue from 'vue'
import Vuex from 'vuex'
// 安装插件
Vue.use(Vuex)

// 导入小仓库
import home from './home'
import search from './search'
import detail from './details'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
import pay from './pay'

// 向外共享 Store 类实例
export default new Vuex.Store({
  // 实现 vuex 仓库模块式开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
    pay
  }
})
