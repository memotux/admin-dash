<script lang="ts" setup>
const headData = {
  title: 'Bar Chart',
  description: 'Simple Bar Chart'
}
useSeoMeta(headData)

const { data } = await useAsyncData('barchart', () => queryContent('/data/bar').findOne())

</script>

<template>
  <VContainer>
    <Header v-bind="headData" />
    <v-progress-circular v-if="!data" indeterminate color="primary"></v-progress-circular>
    <VContainer v-else class="rounded-lg elevation-8 bg-primary-400">
      <BarGraph :data="data.bar" />
    </VContainer>
  </VContainer>
</template>

<style scoped></style>
