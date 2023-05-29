import { createStore } from 'vuex'
import loan from './modules/loan.module'

export default createStore({
  state() {
    return {
      message: null,
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    }
  },
  actions: {
    setMessage({commit}, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 4000)
    }
  },
  modules: {
    loan
  }
})
