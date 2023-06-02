import { ref, computed } from 'vue'

export default function useSortedLoans(sortedLoans) {
  const searchQuery = ref('')

  const searchSortedLoans = computed(() => {
    return sortedLoans.value.filter((loan) =>
      loan.fio.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  return {
    searchQuery,
    searchSortedLoans,
  }
}
