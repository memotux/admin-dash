<script lang="ts" setup>
import { BarChart } from 'vue-chart-3'
import { useTheme } from 'vuetify'

const props = defineProps<{
  data: {
    country: string
    hotdog: number
    hotdogColor: string
    burger: number
    burgerColor: string
    kebab: number
    kebabColor: string
    donut: number
    donutColor: string
  }[]
}>()

const theme = useTheme()
const colors = theme.current.value.colors

const options = { grouped: false, scales: { y: { stacked: true } }, parsing: { xAxisKey: 'country' } }

const data = {
  labels: props.data.map(val => val.country),
  datasets: [
    {
      label: 'Hot Dog',
      data: props.data,
      parsing: {
        yAxisKey: 'hotdog'
      },
      // backgroundColor: colors['greenAccent-700']
    },
    {
      label: 'Burger',
      data: props.data,
      parsing: {
        yAxisKey: 'burger'
      },
      // backgroundColor: colors['blueAccent-700']
    },
    {
      label: 'Kebab',
      data: props.data,
      parsing: {
        yAxisKey: 'kebab'
      },
      // backgroundColor: colors['redAccent-700']
    },
    {
      label: 'Donut',
      data: props.data,
      parsing: {
        yAxisKey: 'donut'
      },
      // backgroundColor: colors['info']
    }
  ]
}
</script>

<template>
  <BarChart style="height: 75vh;" :chartData="data" :options="options" />
</template>

<style scoped></style>
