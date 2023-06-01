<template>
  <div class="card">
    <Bar id="my-chart-id" :options="options" :data="chartData" />
    <button class="btn primary" @click="hadleAnalytics">Показать статистику</button>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { useStore } from 'vuex'
import { computed, handleError, onMounted, ref } from 'vue'
import axios from '../axios/common-http'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: { Bar },
  setup() {
    const store = useStore()
    const counts = ref([])
    const labels = ref([])
    const data = ref([])
    const options = ref({
      responsive: true,
    })

    onMounted(async () => {
      data.value = await axios.get('/analytics').then(res => res.data)
      counts.value = data.value.map((item) => item.loansAtThisDate)
      labels.value = data.value.map((item) => item._id)
    })

    console.log([...counts.value])
    console.log([...labels.value])
    // onMounted(async () => {
    //   const counts = data.map((item) => item.loansAtThisDate)
    //   console.log(counts)
    //   store.commit('loan/setCountsByDate', [1, 2])

    // })

    //const counts = store.getters['loan/countsByDate']

    //console.log(counts)

    // const chartData = ref({
    //   labels: [1, 2, 3, 4],
    //   datasets: [{ label: 'Количество заявок по дням', data: [1, 2, 3, 4] }],
    // })

    return {
      chartData: {
        labels: [...labels.value],
        datasets: [
          { label: 'Количество заявок по дням', data: [...counts.value] },
        ],
      },
      options
      //hadleAnalytics
    }
  },
}
</script>
