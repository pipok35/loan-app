import axios from '../../axios/common-http'
import store from '../index'

export default {
  namespaced: true,
  state() {
    return {
      loans: [],
      countsByDate: [],
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
      ],
    }
  },
  mutations: {
    setLoans(state, loans) {
      state.loans = loans
    },
    addLoan(state, loan) {
      state.loans.push(loan)
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setCountsByDate(state, countsByDate) {
      state.countsByDate = countsByDate
    },
  },
  actions: {
    async loadLoansByDate({ commit}) {
      try {
        const {data} = await axios.get('/analytics')
        const loansByDate = data
        commit('setLoansByDate', loansByDate)
      } catch (e) {
        console.log(e)
      }
    },
    async create({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.post('/loans', payload)
        commit('addLoan', { ...payload, _id: data.id })
        dispatch(
          'setMessage',
          {
            value: 'Заявка успешно создана',
            type: 'primary',
          },
          { root: true }
        )
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger',
          },
          { root: true }
        )
        throw new Error()
      }
    },
    async load({ commit }) {
      try {
        const { data } = await axios.get('/loans')
        commit('setLoans', data)
      } catch (e) {
        console.log(e)
      }
    },
    async loadOne({ commit, dispatch }, id) {
      try {
        const { data } = await axios.get(`/loans/${id}`)
        return data
      } catch (e) {
        console.log(e)
      }
    },
    async remove({ dispatch }, id) {
      try {
        await axios.delete(`/loans/${id}`)
        dispatch(
          'setMessage',
          {
            value: 'Заявка удалена',
            type: 'primary',
          },
          { root: true }
        )
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger',
          },
          { root: true }
        )
      }
    },
    async update({ dispatch }, loan) {
      try {
        await axios.put(`/loans/${loan.id}`, loan)
        dispatch(
          'setMessage',
          {
            value: 'Заявка обновлена',
            type: 'primary',
          },
          { root: true }
        )
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger',
          },
          { root: true }
        )
      }
    },
  },
  getters: {
    loans(state) {
      return state.loans
    },
    sortedLoans(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      )
    },
    dates(state) {
      return [...state.loans]
    },
    countsByDate(state) {
      return [...state.countsByDate]
    }
  },
}
