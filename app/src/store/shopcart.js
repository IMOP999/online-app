import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'

const actions = {
  // 获取购物车列表数据
  async getCarList({ commit }) {
    let result = await reqCartList()
    console.log(result)
    if (result.code === 200) {
      commit('GETCARLIST', result.data)
    }
  },

  // 删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    // console.log(result)
    return result.code === 200 ? 'OK' : Promise.reject(new Error('failed'))
  },

  // 修改购物车某一个产品的选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    console.log(result)
    return result.code === 200 ? 'OK' : Promise.reject(new Error('failed'))
  },

  // 删除全部选中商品
  deleteAllCheckedCart({ dispatch, getters, state }) {
    // context:小仓库
    // commit getters dispatch state
    // 获取购物车中全部的产品
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      // 将每次返回的 Promise 添加到数组中
      PromiseAll.push(promise)
    })
    // 全部 promise 成功，结果成功
    return Promise.all(PromiseAll)
  },

  // 修改全部产品的状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let PromiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }
}
const mutations = {
  GETCARLIST(state, cartList) {
    state.cartList = cartList
  }
}
const state = {
  cartList: []
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}
