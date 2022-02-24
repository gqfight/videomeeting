import { createStore } from 'vuex'

import { IRootState } from './types'
import login from './login/login'
import reg from './reguser/reg'
import meeting from './meeting/meeting'
const store = createStore<IRootState>({
  state: () => {
    return {
      username: 'coderwhy'
    }
  },
  mutations: {
    cUserName(state, payload) {
      state.username = payload.username
      console.log(state.username)
    }
  },
  getters: {},
  actions: {},
  modules: {
    login,
    reg,
    meeting
  }
})

export default store
