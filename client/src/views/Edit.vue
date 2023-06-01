<template>
  <div v-if="loan">
    <form class="form" @submit.prevent="submit">
      <h1>Редактировать заявку</h1>

      <div class="form-control" :class="{ invalid: fError }">
        <label for="fio">ФИО</label>
        <input type="text" id="fio" v-model="fio" />
        <small v-if="fError">{{ fError }}</small>
      </div>

      <div class="form-control">
        <label for="gender">Пол</label>
        <select id="gender" v-model="gender">
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
      </div>

      <div class="form-control" :class="{ invalid: bError }">
        <label for="bDate">Дата рождения</label>
        <input type="date" id="bDate" v-model="bDate" />
        <small v-if="bError">{{ bError }}</small>
      </div>

      <div class="form-control" :class="{ invalid: aError }">
        <label for="amount">Сумма кредита</label>
        <input type="number" id="amount" v-model.number="amount" />
        <small v-if="aError">{{ aError }}</small>
      </div>

      <div class="form-control">
        <label for="measureTime">Единица измерения срока кредита </label>
        <select id="measureTime" v-model="measureTime">
          <option value="День">День</option>
          <option value="Месяц">Месяц</option>
          <option value="Год">Год</option>
        </select>
      </div>

      <div class="form-control" :class="{ invalid: tError }">
        <label for="time">Срок кредита</label>
        <input type="number" id="time" v-model.number="time" />
        <small v-if="tError">{{ tError }}</small>
      </div>

      <button class="btn primary" @click="updateLoan">Обновить</button>
      <button class="btn danger" @click="deleteLoan">Удалить</button>
    </form>
  </div>
  <h2 v-else class="text-center">Заявки с id {{ id }} нет</h2>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const loan = ref({})
    const store = useStore()
    const fio = ref()
    const gender = ref()
    const bDate = ref()
    const amount = ref()
    const measureTime = ref()
    const time = ref()

    onMounted(async () => {
      loan.value = await store.dispatch('loan/loadOne', route.params.id)
      fio.value = loan.value.fio
      gender.value = loan.value.gender
      bDate.value = loan.value.bDate
      amount.value = loan.value.amount
      measureTime.value = loan.value.measureTime
      time.value = loan.value.time
    })

    const deleteLoan = async () => {
      await store.dispatch('loan/remove', route.params.id)
      router.push('/')
    }

    const updateLoan = async () => {
      const data = {
        ...loan.value,
        fio: fio.value,
        gender: gender.value,
        bDate: bDate.value,
        time: time.value,
        measureTime: measureTime.value,
        amount: amount.value,
        id: route.params.id,
        updateDate: new Date()
      }
      await store.dispatch('loan/update', data)
      router.push('/')
    }

    return {
      loan,
      id: route.params.id,
      fio,
      gender,
      bDate,
      time,
      measureTime,
      amount,
      updateLoan,
      deleteLoan,
    }
  },
}
</script>

<style lang="scss" scoped></style>
