import { ref, computed } from 'vue'

export default function useSortLoans(loans) {
  const selectedSort = ref('')
  const sortedLoans = computed(() => {
    if (selectedSort.value === 'bDate') {
      return [...loans.value].sort((loan1, loan2) =>
        loan1[selectedSort.value] > loan2[selectedSort.value] ? 1 : -1
      )
    } else
      return [...loans.value].sort((loan1, loan2) =>
        loan1[selectedSort.value] < loan2[selectedSort.value] ? 1 : -1
      )
  })

  return {
    selectedSort,
    sortedLoans,
  }
}
