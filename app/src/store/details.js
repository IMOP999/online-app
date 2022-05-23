// search模块小仓库
import { reqGetGoodsInfo, reqAddOrUpdateCart } from '@/api'
// 封装游客身份模块的 uuid
import { getUUID } from '@/utils/uuid_token'

// 处理 action，可以书写自定义业务逻辑， 也可以异步处理
const actions = {
  // 获取产品信息的 action
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGetGoodsInfo(skuId)
    // console.log(result)
    if (result.code === 200) {
      commit('GETGOODSINFO', result.data)
    }
  },

  // 将产品添加到购物车中
  async addOrUpdateCart({ commit }, { skuId, skuNum }) {
    // 加入购物车后发起请求，前台将数据发给服务器
    // 服务器写入数据成功，没有返回其他数据（不需要三连环存储数据），只有返回 code = 200
    console.log('detail store', skuId, skuNum)
    let result = await reqAddOrUpdateCart(skuId, skuNum)
    console.log('detail', result)
    // 成功
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}

// 修改 state
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}

// 仓库存储数据
const state = {
  goodsInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}

// 类似于计算属性，简化仓库数据
const getters = {
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
