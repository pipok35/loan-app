<template>
  <form class="form" @submit.prevent="submit">
    <h1>Создать заявку</h1>
    <div class="form-control" :class="{ invalid: fError }">
      <label for="fio">ФИО</label>
      <input type="text" id="fio" v-model="fio"  />
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

    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import * as yup from 'yup'

export default {
  setup() {
    const schema = yup.object({
      fio: yup.string().matches(/[A-Za-zА-Яа-яЁё]/, 'Только буквы').required('Введите ФИО').trim(),
      bDate: yup.string().trim().required('Введите дату рождения'),
      amount: yup
        .number()
        .required('Введите сумму')
        .min(0, 'Сумма не может быть меньше 0'),
      time: yup
        .number()
        .required('Укажите срок кредита')
        .min(0, 'Срок кредита не может быть меньше 0'),
    })

    const { handleSubmit, values } = useForm({
      initialValues: {
        gender: 'Мужской',
        measureTime: 'Месяц',
      },
      validationSchema: schema,
    })

    const { value: fio, errorMessage: fError } = useField('fio')
    const { value: bDate, errorMessage: bError } = useField('bDate')
    const { value: amount, errorMessage: aError } = useField('amount')
    const { value: time, errorMessage: tError } = useField('time')
    const { value: gender } = useField('gender')
    const { value: measureTime } = useField('measureTime')

    const store = useStore()
    const router = useRouter()

    const submit = handleSubmit(async (values) => {
      console.log(values)
      try {
        await store.dispatch('loan/create', values)
        router.push('/')
      } catch (e) {}
    })

    return {
      gender,
      submit,
      fio,
      fError,
      bDate,
      amount,
      bError,
      aError,
      time,
      tError,
      measureTime,
      values,
    }
  },
}
</script>

<style scoped></style>
