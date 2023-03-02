<script lang="ts" setup>
import { LineChart } from 'vue-chart-3'
import { useTheme } from 'vuetify'

const props = defineProps<{
  data: {
    id: string
    color: string
    data: {
      x: string
      y: string
    }[]
  }[]
  isDashboard?: boolean
}>()

const theme = useTheme()

const data = {
  labels: props.data[0].data.map(val => val.x),
  datasets: props.data.map(val => ({
    label: val.id,
    data: val.data,
  }))
}

const options = {
  scales: {
    y: {
      stacked: true,
      ticks: {
        color: theme.current.value.colors['secondary']
      }
    },
    x: {
      ticks: {
        color: theme.current.value.colors['secondary']
      }
    }
  },
  plugins: {
    title: {
      display: true,
      text: 'Line Chart',
    },
    // legend: {
    //   labels: {
    //     // This more specific font property overrides the global property
    //     font: {
    //       size: 16
    //     }
    //   }
    // }
  }
}
</script>

<template>
  <LineChart
    :style="{ height: isDashboard ? '25vh' : '75vh' }"
    :chartData="data"
    :options="options" />
</template>
