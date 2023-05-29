<template>
  <div class="card">
    <h1>Список заявок</h1>
    <loan-table :loans="loans"></loan-table>
  </div>
</template>

<script>
import LoanTable from '../components/LoanTable.vue'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()

    onMounted(async () => {
      await store.dispatch('loan/load')
    })

    const loans = computed(() => store.getters['loan/loans'])

    return {
      loans,
    }
  },

  components: { LoanTable },
}
</script>

<style lang="scss" scoped></style>
