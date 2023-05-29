<template>
  <h4 v-if="loans.length === 0" class="text-center">Заявок пока нет</h4>
  <table v-else class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Пол</th>
        <th>Дата рождения</th>
        <th>Сумма кредита</th>
        <th>Ед. измерения срока кредита</th>
        <th>Срок кредита</th>
        <th>Действие</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(loan, idx) in loans" :key="loan.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ loan.fio }}</td>
        <td>{{ loan.gender }}</td>
        <td>{{ loan.bDate }}</td>
        <td>{{ loan.amount }}</td>
        <td>{{ loan.measureTime }}</td>
        <td>{{ loan.time }}</td>
        <td>
          <router-link :to="{name: 'Edit', params: {id: loan._id}}">
            <button class="btn primary" @click="navigate">Открыть</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['loans'],

}
</script>

<style lang="scss" scoped></style>
