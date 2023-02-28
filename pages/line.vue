<script lang="ts" setup>
const headData = {
  title: 'Line Chart',
  description: 'Simple Line Chart'
}
useSeoMeta(headData)

const { data, pending } = await useAsyncData('Linechart', () => queryContent('/data/line').findOne())

</script>

<template>
  <VContainer>
    <Header v-bind="headData" />
    <VProgressCircular v-if="pending || !data" indeterminate size="100" color="warning" />
    <VContainer v-else class="rounded-lg elevation-8 bg-primary-400">
      <LineGraph :data="data.line" />
    </VContainer>
  </VContainer>
</template>

<style scoped></style>
