import { Module } from 'vuex'
import { IMeetingState } from './types'
import { IRootState } from '../types'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const meetingModule: Module<IMeetingState, IRootState> = {
  namespaced: true,
  state() {
    return {
      channelName: '',
      mtoken: ''
    }
  },
  mutations: {
    wchannelName(state, payload) {
      state.channelName = payload
    },
    wmtoken(state, payload) {
      state.mtoken = payload
    }
  },
  actions: {
    async meetingCreaAction({ commit, state }, payload: any) {
      const res = await await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3007/api/creatoken',
        params: {
          username: this.state.username,
          channelName: payload.channelName
        }
      })
      const data = res.data
      if (data.status === 0) {
        commit('wmtoken', data.mtoken)
        commit('wchannelName', payload.channelName)
        ElMessage({
          message: '会议创建成功',
          type: 'success'
        })
        return true
      }
    }
  }
}
export default meetingModule
