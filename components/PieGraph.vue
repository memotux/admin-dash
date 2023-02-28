<script lang="ts" setup>
import { PieChart } from 'vue-chart-3'

const props = defineProps<{
  data: {
    id: string
    label: string
    value: number
    color: string
  }[]
}>()

const data = {
  labels: props.data.map(val => val.label),
  datasets: [
    {
      label: 'Pie Chart',
      data: props.data.map(val => val.value),
      // backgroundColor: [colors['info'], colors['error'], colors['success'], colors['secondary'], colors['redAccent-700']]
    }
  ],
  title: 'Pie Chart'
}
</script>

<template>
  <PieChart style="height: 75vh;" :chartData="data" />
</template>

<style scoped></style>
