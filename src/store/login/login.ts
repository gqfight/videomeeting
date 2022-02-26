import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userinfo: {}
    }
  },
  getters: {
    getuserName(state) {
      return state.userinfo.username
    }
  },
  mutations: {
    cuserinfo(state, payload) {
      state.userinfo = payload
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: any) {
      //进行用户的登录验证
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3007/api/login',
        params: { ...payload }
      })
      const data = res.data
      if (data.status === 0) {
        ElMessage({
          message: data.message,
          type: 'success',
          duration: 1000
        })
      } else {
        ElMessage({
          message: data.message,
          type: 'error',
          duration: 1000
        })
      }
      return data
    }
  }
}

export default loginModule
