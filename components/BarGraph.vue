<script lang="ts" setup>
// import { BarChart } from 'vue-chart-3'
import { plot, barY, ruleY, stackY, text } from '@observablehq/plot'

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
  isDashboard?: boolean
}>()

const container = ref<HTMLDivElement | null>(null)

interface BarDataTransform { country: string, food: string, value: number }

const newData = props.data.reduce<BarDataTransform[]>((acc, cur) => {
  Object.entries(cur).splice(1).forEach((v) => {
    if (v[0].includes('Color')) {
      return
    }
    acc.push({
      'country': cur.country,
      'food': v[0],
      'value': v[1] as number
    })
  })
  return acc
}, [])

onMounted(() => {
  container.value?.append(plot({
    grid: true,
    style: {
      background: "transparent",
      width: '100%'
    },
    x: {
      type: "band",
      // tickFormat: (d: string) => d,
      label: 'Country'
    },
    y: {
      label: 'Food'
    },
    color: {
      legend: true,
    },
    marks: [
      barY(newData, stackY({ x: 'country', y: 'value', fill: (d: BarDataTransform) => d.food.toUpperCase() })),
      text(newData, stackY({ x: 'country', y: 'value', text: 'value', title: (d: BarDataTransform) => `${d.food.toUpperCase()}: ${d.value}`, fontWeight: '800' })),
      ruleY([0], {})
    ]
  }))
})

/*
 *  Vue Chart.js data
 *  Just for history
 */

// const options = {
//   grouped: false,
//   scales: {
//     y: { stacked: true }
//   },
//   parsing: { xAxisKey: 'country' }
// }

// const data = {
//   labels: props.data.map(val => val.country),
//   datasets: [
//     {
//       label: 'Hot Dog',
//       data: props.data,
//       parsing: {
//         yAxisKey: 'hotdog'
//       },
//       // backgroundColor: colors['greenAccent-700']
//     },
//     {
//       label: 'Burger',
//       data: props.data,
//       parsing: {
//         yAxisKey: 'burger'
//       },
//       // backgroundColor: colors['blueAccent-700']
//     },
//     {
//       label: 'Kebab',
//       data: props.data,
//       parsing: {
//         yAxisKey: 'kebab'
//       },
//       // backgroundColor: colors['redAccent-700']
//     },
//     {
//       label: 'Donut',
//       data: props.data,
//       parsing: {
//         yAxisKey: 'donut'
//       },
//       // backgroundColor: colors['info']
//     }
//   ]
// }
</script>

<template>
  <!-- <BarChart :style="{ height: isDashboard ? '25vh' : '75vh' }" :chartData="data" :options="options" /> -->
  <div ref="container"></div>
</template>
