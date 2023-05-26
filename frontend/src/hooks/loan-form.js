import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useLoanForm(fn) {
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      status: 'active'
    }
  })

  const {value: fio, errorMessage: fError, handleBlur: fBlur} = useField(
    'fio',
    yup.string()
      .trim()
      .required('Введите ФИО')
  )
  const {value: bDate, errorMessage: bError, handleBlur: bBlur} = useField(
    'bDate',
    yup.string()
      .trim()
      .required('Введите дату рождения')
  )
  const {value: amount, errorMessage: aError, handleBlur: aBlur} = useField(
    'amount',
    yup.number()
      .required('Введите сумму')
      .min(0, 'Сумма не может быть меньше 0')
  )
  const {value: gender} = useField('gender')

  const onSubmit = handleSubmit(fn)

  return {
    gender,
    isSubmitting,
    onSubmit,
    fio,
    fBlur,
    fError,
    bDate,
    amount,
    bError,
    bBlur,
    aError,
    aBlur
  }
}