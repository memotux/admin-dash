<script lang="ts" setup>
const headData = {
  title: 'Dashboard',
  // description: 'Full Calendar Interactive Page'
}
useSeoMeta(headData)
</script>

<template>
  <div>
    <Header v-bind="headData" />
  </div>
</template>
