import axios from '../../axios/common-http'
import store from '../index'

export default {
  namespaced: true,
  state() {
    return {
      loans: []
    }
  },
  mutations: {
    setLoans(state, loans) {
      state.loans = loans
    },
    addLoan(state, loan) {
      state.loans.push(loan)
    }
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        const {data} = await axios.post('/loans', payload)
        commit('addLoan', {...payload, _id: data.id})
        dispatch('setMessage', {
          value: 'Заявка успешно создана',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
        throw new Error()
      }
    },
    async load({ commit }) {
      try {
        const {data} = await axios.get('/loans')
        console.log(data)
        commit('setLoans', data)
      } catch (e) {
        console.log(e)
      }
    },
    async loadOne({ commit, dispatch }, id) {
      try {
        const {data} = await axios.get(`/loans/${id}`)
        return data
      } catch (e) {
        console.log(e)
      }
    },
    async remove({ dispatch }, id) {
      try {
        await axios.delete(`/loans/${id}`)
        dispatch('setMessage', {
          value: 'Заявка удалена',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    },
    async update({ dispatch }, loan) {
      try {
        await axios.put(`/loans/${loan.id}`, loan)
        dispatch('setMessage', {
          value: 'Заявка обновлена',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, {root: true})
      }
    }
  },
  getters: {
    loans(state) {
      return state.loans
    }
  }
}