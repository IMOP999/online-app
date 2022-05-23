// API 进行统一管理
import requests from './request'
import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList  get 无参数
// 发请求：axios 发请求返回结果：Promise 对象
export const reqGetCategoryList = () => {
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}

// 当前函数执行需要把服务器服务器返回结果返回
// 获取 banner (Home 首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取 floor (Home 首页轮播图接口)
export const reqGetFloorList = () => mockRequests.get('/floor')

// 获取 search 模块数据，地址：/api/list  post 需要参数
// 默认参数params为空对象
export const reqPostSearchInfo = params => {
  return requests({
    url: '/list',
    method: 'post',
    data: params
  })
}

// 获取产品详情信息接口 /api/item/{skuId} get
export const reqGetGoodsInfo = skuId => {
  return requests({
    url: `/item/${skuId}`,
    method: 'get'
  })
}

// 将产品添加到购物车中（获取更新某一个产品的个数）/api/cart/addToCart/{skuId}/{skuNum} post
export const reqAddOrUpdateCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })

// 获取购物车列表数据接口 /api/cart/cartList get
export const reqCartList = () =>
  requests({
    url: '/cart/cartList',
    method: 'get'
  })

// 删除购物车产品的接口 /api/cart/deleteCart/{skuId} delete
export const reqDeleteCartById = skuId =>
  requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })

// 修改商品选中的状态 /api/cart/checkCart/{skuId}/{isChecked} get
export const reqUpdateCheckedById = (skuId, isChecked) =>
  requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })

// 获取验证码 /api/user/passport/sendCode/{phone} get
export const reqGetCode = phone =>
  requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
  })

// 用户注册 /api/user/passport/register post 参数：phone code password
export const reqUserRegister = data => {
  return requests({
    url: '/user/passport/register',
    data: data,
    method: 'post'
  })
}

// 用户登录 /api/user/passport/login post 参数：phone password
export const reqUserLogin = data =>
  requests({
    url: '/user/passport/login',
    data: data,
    method: 'post'
  })

// 获取用户信息 /api/user/passport/auth/getUserInfo get
export const reqUserInfo = () =>
  requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
  })

// 退出登录 /api/user/passport/logout get
export const reqLogOut = () =>
  requests({
    url: '/user/passport/logout',
    method: 'get'
  })

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqAddressInfo = () =>
  requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
  })

// 获取商品清单 /api/order/auth/trade get
export const reqOrderInfo = () =>
  requests({
    url: '/order/auth/trade',
    method: 'get'
  })

// 提交订单接口 /api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
  })

// 获取支付信息 /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = orderId =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
  })

// 获取支付订单状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = orderId =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId} `,
    method: 'get'
  })

// 获取个人中心数据 /api/order/auth/{page}/{limit}  get
export const reqMyOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
  })
