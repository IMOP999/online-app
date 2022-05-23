// 登录和注册的模块
import { reqGetCode, reqLogOut, reqUserInfo, reqUserLogin, reqUserRegister } from '@/api'
import { getToken, removeToken, setToken } from '@/utils/token'

const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 返回验证码，但是正常情况，后台把验证码发到用户手机上
    let result = await reqGetCode(phone)
    // console.log(result)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  // 用户注册
  async userRegister({ commit }, data) {
    let result = await reqUserRegister(data)
    // console.log(result)
    return result.code === 200 ? 'ok' : Promise.reject(new Error('failed'))
  },

  // 用户登录
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    // console.log(result)
    // 服务器下发 token， 用户唯一标识符（uuid）
    // 将来经常通过带 token 找服务器要用户信息进行展示
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      // 用户登录成功，且已经获取到token
      // 持久化存储 token
      // localStorage.setItem('TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    // console.log(result)
    if (result.code === 200) {
      // 提交用户信息
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  // 退出登录
  async userLogOut({ commit }) {
    // 向服务器发起请求，通知服务器清除 token
    let result = await reqLogOut()
    console.log(result)
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}

const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除本地数据
  CLEAR(state) {
    // 清空仓库中用户信息
    state.token = ''
    state.userInfo = {}
    // 清空本地存储数据
    removeToken()
  }
}

const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const getters = {}

export default {
  actions,
  mutations,
  state,
  getters
}
