<template>
  <div class="card">
    <h1>Список заявок</h1>
    <div class="form-control">
      <h3>Поиск по имени: </h3>
      <input v-model="searchQuery" placeholder="Введите имя" />
    </div>
    <Select v-model="selectedSort" :options="sortOptions" />
    <loan-table :loans="searchSortedLoans"></loan-table>
    <div class="pagination">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': page === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
  </div>
</template>

<script>
import LoanTable from '../components/LoanTable.vue'
import Select from '../components/Select.vue'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import axios from '../axios/common-http'
import useSortLoans from '../use/useSortLoans'
import useSearchLoans from '../use/useSearchLoans'

export default {
  setup() {
    const store = useStore()
    const loans = ref([])
    const totalPages = ref(0)
    const limit = 10
    const page = ref(1)
    const sortOptions = [
      { value: 'time', name: 'По сроку займа' },
      { value: 'amount', name: 'По сумме займа' },
      { value: 'gender', name: 'По полу' },
      { value: 'bDate', name: 'По возрасту' },
    ]
    const { sortedLoans, selectedSort } = useSortLoans(loans)
    const { searchQuery, searchSortedLoans } = useSearchLoans(sortedLoans)

    const fetching = async (start, end) => {
      try {
        const { data } = await axios.get('/loans')
        totalPages.value = Math.ceil(data.length / limit)
        loans.value = data.slice(start, end)
      } catch (e) {
        console(e)
      }
    }

    onMounted(() => fetching(0, 10))

    const changePage = (pageNumber) => {
      page.value = pageNumber
      let startLoan = limit * (pageNumber - 1)
      let endLoan = startLoan + limit
      console.log(startLoan, endLoan)
      fetching(startLoan, endLoan)
    }

    return {
      loans,
      totalPages,
      changePage,
      page,
      sortOptions,
      sortedLoans,
      selectedSort,
      searchQuery,
      searchSortedLoans,
    }
  },

  components: { LoanTable, Select },
}
</script>

<style scoped></style>
