<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-control" :class="{ invalid: fError }">
      <label for="fio">ФИО</label>
      <input type="text" id="fio" v-model="fio" @blur="fBlur" />
      <small v-if="fError">{{ fError }}</small>
    </div>

    <div class="form-control" :class="{ invalid: bError }">
      <label for="bDate">Дата рождения</label>
      <input type="text" id="bDate" v-model="bDate" @blur="bBlur" />
      <small v-if="bError">{{ bError }}</small>
    </div>

    <div class="form-control" :class="{ invalid: aError }">
      <label for="amount">Сумма кредита</label>
      <input type="number" id="amount" v-model.number="amount" @blur="aBlur" />
      <small v-if="aError">{{ aError }}</small>
    </div>

    <div class="form-control">
      <label for="gender">Пол</label>
      <select id="gender" v-model="gender">
        <option value="done">Мужской</option>
        <option value="cancelled">Женский</option>
      </select>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>
import {useLoanForm} from '../hooks/loan-form'

export default {
  setup() {
    return {
      ...useLoanForm(),
    }
  },
}
</script>

<style scoped></style>
