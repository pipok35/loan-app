<template>
  <div class="card">
    <h1>Список заявок</h1>
    <loan-table :loans="loans"></loan-table>
    <div class="pages">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="pageNumber"
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
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import axios from '../axios/common-http'

export default {
  setup() {
    const store = useStore()
    const loans = ref([])
    const totalPages = ref(0)
    const limit = 10
    const page = ref(1)

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
    }
  },

  components: { LoanTable },
}
</script>

<style scoped></style>
