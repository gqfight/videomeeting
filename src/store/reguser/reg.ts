import { Module } from 'vuex'
import { IRegState } from './types'
import { IRootState } from '../types'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const RegModule: Module<IRegState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userinfo: {}
    }
  },
  getters: {},
  mutations: {},
  actions: {
    async accountRegAction({ commit }, payload: any) {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3007/api/reguser',
        params: { ...payload }
      })
      const data = res.data
      if (data.status === 0) {
        ElMessage({
          message: data.message,
          type: 'success'
        })
      } else {
        ElMessage({
          message: data.message,
          type: 'error'
        })
      }
    }
  }
}

export default RegModule
