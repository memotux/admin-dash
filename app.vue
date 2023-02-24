<template>
  <v-app>
    <Sidebar />

    <Topbar />

    <VMain style="min-height: 300px;">
      <VContainer style="min-height: 300px;">
        <NuxtPage />
      </VContainer>
    </VMain>
  </v-app>
</template>