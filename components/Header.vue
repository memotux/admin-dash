<script setup lang="ts">
defineProps<{ title: string, subtitle?: string }>()
</script>

<template>
  <v-container>
    <h2>{{ title }}</h2>
    <p v-if="subtitle">{{ subtitle }}</p>
  </v-container>
</template>