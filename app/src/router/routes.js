// 导入路由组件
import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
import Search from '@/views/Search/Search.vue'
import Register from '@/views/Register/Register.vue'
import Detail from '@/views/Detail/Detail.vue'
import AddCartSuccess from '@/views/AddCartSuccess/AddCartSuccess.vue'
import ShopCart from '@/views/ShopCart/ShopCart.vue'
import Trade from '@/views/Trade/Trade.vue'
import Pay from '@/views/Pay/Pay.vue'
import PaySuccess from '@/views/PaySuccess/PaySuccess.vue'
import Center from '@/views/Center/Center.vue'

// 导入二级路由
import MyOrder from '@/views/Center/myOrder.vue'
import GroupOrder from '@/views/Center/groupOrder.vue'

// 配置路由规则
export default [
  // 路由重定向
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    // 是否展示 Footer 组件
    meta: { show: true }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    // path: '/search',
    component: Search,
    meta: { show: true }
    // 1.布尔值，params
    // props: true,
    // 2.对象形式
    // props:{a:1, b:2},
    // 3.函数形式
    // props: $route => ({ keyword: $route.params.keyword, k2: $route.query.keyword })
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false }
  },
  {
    path: '/register',
    component: Register,
    meta: { show: false }
  },
  {
    path: '/detail/:skuid?',
    component: Detail,
    meta: { show: true }
  },
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true }
  },
  {
    name: 'shopcart',
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true }
  },
  {
    name: 'trade',
    path: '/trade',
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    name: 'pay',
    path: '/pay',
    component: Pay,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    name: 'paysuccess',
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true }
  },
  {
    name: 'center',
    path: '/center',
    component: Center,
    redirect: '/center/myorder',
    meta: { show: true },
    // 二级路由组件
    children: [
      { path: 'myorder', component: MyOrder },
      { path: 'grouporder', component: GroupOrder }
    ]
  }
]
