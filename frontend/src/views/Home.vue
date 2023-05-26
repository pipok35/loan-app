<template>
  <div class="card">
    <h1>Список заявок</h1>
    <loan-table :requests="[]"></loan-table>
  </div>
</template>

<script>
  import LoanTable from '../components/LoanTable.vue'
  export default {
    components: {LoanTable}
  }
</script>

<style lang="scss" scoped></style>
