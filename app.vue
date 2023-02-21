<template>
  <v-app>
    <Sidebar />

    <Topbar />

    <v-main style="min-height: 300px;">
      <v-container class="d-flex justify-center align-center text-h5" style="min-height: 300px;">
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>