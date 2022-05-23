// search模块小仓库
import { reqPostSearchInfo } from '@/api'
// 处理 action，可以书写自定义业务逻辑， 也可以异步处理
const actions = {
  // 获取search数据
  async getSearchList({ commit }, params = {}) {
    const result = await reqPostSearchInfo(params)
    // console.log(result)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}

// 修改 state
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}

// 仓库存储数据
const state = {
  searchList: {}
}

// 类似于计算属性，简化仓库数据
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
