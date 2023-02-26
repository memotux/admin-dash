// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['./modules/vuetify'],
  build: {
    transpile: ['@fullcalendar.*']
  }
})
