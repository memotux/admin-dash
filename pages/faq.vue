<script setup lang="ts">
const headData = {
  title: 'FAQ',
  description: 'Frequently Asked Questions Page'
}
useSeoMeta(headData)
</script>

<template>
  <Header v-bind="headData" />
  <VExpansionPanels color="greenAccent-800" variant="popout" class="my-4">
    <VExpansionPanel v-for="i in 6" :key="'faq' + i" :title="`Item ${i}`"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.">
    </VExpansionPanel>
  </VExpansionPanels>
</template>
