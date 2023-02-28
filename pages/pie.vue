<script lang="ts" setup>
const headData = {
  title: 'Pie Chart',
  description: 'Simple Pie Chart'
}
useSeoMeta(headData)

const { data, pending } = await useAsyncData('piechart', () => queryContent('/data/pie').findOne())

</script>

<template>
  <VContainer>
    <Header v-bind="headData" />
    <VProgressCircular v-if="pending || !data" indeterminate size="100" color="warning" />
    <VContainer v-else class="rounded-lg elevation-8 bg-primary-400">
      <PieGraph :data="data.pie" />
    </VContainer>
  </VContainer>
</template>

<style scoped></style>
