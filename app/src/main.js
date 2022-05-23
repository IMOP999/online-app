import Vue from 'vue'
import App from './App.vue'
// 导入路由模块
import router from '@/router'
// 引入仓库
import store from '@/store'
// 三级联动组件（全局组件）
import TypeNav from '@/components/TypeNav.vue'
import Carousel from '@/components/Carousel.vue'
import Pagination from '@/components/Pagination.vue'
import { Button, MessageBox } from 'element-ui'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 注册全局组件
Vue.component(Button.name, Button)
// ElementUI 注册组件时挂载在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入 mockServe mock 数据
import '@/mock/mockServe'
// 引入 swiper 样式
import 'swiper/css/swiper.css'

// 统一接口 api 文件夹里面全部的请求函数
import * as API from '@/api'

// 导入 lazyload 插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: '@/assets/logo.png'
})
// 自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins, {
  name: 'upper'
})
// 导入validate 表单验证插件
import '@/plugins/validate'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 配置全局事件总线 $bus
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由，组件身上拥有 $route, $router 属性
  router,
  // 注册仓库，组件身上拥有 $store 属性
  store
}).$mount('#app')
