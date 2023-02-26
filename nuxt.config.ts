import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['./modules/vuetify', '@nuxt/content'],
  content: {
    sources: {
      content: {
        driver: 'fs',
        prefix: '/data',
        base: resolve(__dirname, 'data')
      }
    }
  },
  build: {
    transpile: ['@fullcalendar.*']
  }
})
