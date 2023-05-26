<template>
  <h4 v-if="requests.length === 0" class="text-center">Заявок пока нет</h4>
  <table v-else class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Пол</th>
        <th>Дата рождения</th>
        <th>Сумма кредита</th>
        <th>Срок кредита</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  props: ['requests'],
  setup() {
    
  },
}
</script>

<style lang="scss" scoped></style>
