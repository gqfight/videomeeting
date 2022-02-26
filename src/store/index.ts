import { createStore } from 'vuex'

import { IRootState } from './types'
import login from './login/login'
import reg from './reguser/reg'
import meeting from './meeting/meeting'
const store = createStore<IRootState>({
  state: () => {
    return {
      info: {}
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    reg,
    meeting
  }
})

export default store
