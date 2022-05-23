// home模块小仓库

// 引入 api
import { reqGetCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'

// 处理 action，可以书写自定义业务逻辑， 也可以异步处理
const actions = {
  // 通过 API 里面的接口函数调用，向服务器发请求，获取服务器的数据
  async getCategoryList({ commit }) {
    let result = await reqGetCategoryList()
    // console.log(result)
    if (result.code === 200) {
      commit('GETCATEGORYLIST', result.data)
    }
  },

  // 获取首页轮播图数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList()
    // console.log(result)
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data)
    }
  },

  // 获取首页轮播图数据
  async getFloorList({ commit }) {
    let result = await reqGetFloorList()
    // console.log(result)
    if (result.code === 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}

// 修改 state
const mutations = {
  GETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },

  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },

  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}

// 仓库存储数据
const state = {
  // 默认初始值：根据接口返回值初始化
  categoryList: [],
  // 轮播图数据
  bannerList: [],
  // 轮播图数据
  floorList: []
}

// 类似于计算属性，简化仓库数据
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
