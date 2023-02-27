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
  app: {
    head: {
      titleTemplate: '%s | TuxMin',
      meta: [{
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      { charset: "utf-8" }],
    }
  },
  build: {
    transpile: ['@fullcalendar.*']
  }
})
