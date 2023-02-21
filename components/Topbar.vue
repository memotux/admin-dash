<script setup lang="ts">
import { useTheme } from 'vuetify';

const theme = useTheme()
const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
</script>

<template>
  <v-app-bar color="#1F2A40">
    <v-container fluid>
      <v-row justify="space-between">
        <v-col cols="3">
          <v-text-field density="compact" variant="plain" label="Search" append-inner-icon="mdi:mdi-magnify" single-line
            hide-details />
        </v-col>
        <v-col cols="3" class="text-right">
          <v-btn icon="mdi:mdi-theme-light-dark" @click="toggleTheme" />
          <v-btn icon="mdi:mdi-bell-outline" />
          <v-btn icon="mdi:mdi-cog-outline" />
          <v-btn icon="mdi:mdi-account" />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>