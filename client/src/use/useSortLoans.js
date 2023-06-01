import { ref, computed } from 'vue'

export default function useSortLoans(loans) {
  const selectedSort = ref('')
  const sortedLoans = computed(() => {
    if (selectedSort.value === 'bDate') {
      return [...loans.value].sort((loan1, loan2) =>
        loan1[selectedSort.value] > loan2[selectedSort.value] ? 1 : -1)
    // } else if (selectedSort.value === 'time') {
    //    // if (loans.measureTime === 'День') {
    //    //     return [...loans.value].sort((loan1, loan2) =>
    //     //    loan1[selectedSort.value] < loan2[selectedSort.value] ? 1 : -1)
    //    //} else if (loans.measureTime === 'Месяц') {
    //      //   return [...loans.value].sort((loan1, loan2) =>
    //    //     loan1[selectedSort.value] * 30 < loan2[selectedSort.value] * 30 ? 1 : -1)
    //    // } else return [...loans.value].sort((loan1, loan2) =>
    //     //loan1[selectedSort.value] * 365 < loan2[selectedSort.value] * 465 ? 1 : -1)
    
    } else
      return [...loans.value].sort((loan1, loan2) =>
        loan1[selectedSort.value] < loan2[selectedSort.value] ? 1 : -1)
  })

  return {
    selectedSort,
    sortedLoans,
  }
}
