<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  icon?: string
  progress: number
  increase: string
}>()
</script>

<template>
  <VContainer>
    <VRow justify="space-between" align="center" class="text-center">
      <VCol>
        <VIcon v-if="icon" :icon="icon" class="mb-2" />
        <h4 class="text-grey-100">{{ title }}</h4>
      </VCol>
      <VCol>
        <VProgressCircular :rotate="360" :size="100" :width="15" :model-value="progress" color="secondary"
          bg-color="blueAccent-700" />
      </VCol>
    </VRow>
    <VRow justify="space-between" align="center" class="text-center">
      <VCol>
        <h5 class="text-greenAccent-500">{{ subtitle }}</h5>
      </VCol>
      <VCol>
        <h5 class="text-greenAccent-600">{{ increase }}</h5>
      </VCol>
    </VRow>
  </VContainer>
</template>