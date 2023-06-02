<template>
  <div class="card">
    <Bar
      v-if="loaded"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
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
import axios from '../axios/common-http'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components: { Bar },
  data: () => ({
    chartData: null,
    chartOptions: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Количество заявок по дням',
        },
      },
    },
    loaded: false,
  }),

  async mounted() {
    this.loaded = false

    try {
      const { data } = await axios.get('/analytics')
      console.log(data)
      this.chartData = {
        labels: data.map((l) => l._id),
        datasets: [
          {
            label: 'Количество заявок',
            backgroundColor: '#f87979',
            data: data.map((l) => l.loansAtThisDate),
          },
        ],
      }

      this.loaded = true
    } catch (e) {
      console.log(e)
    }
  },
}
</script>
