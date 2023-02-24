import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import { colorTokens as tokens } from '~~/composables/ui'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  ssr: true,
  components: {
    VDataTable,
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: tokens.dark.primary[500],
          secondary: tokens.dark.greenAccent[500],
          neutral: tokens.dark.grey[500],
          background: tokens.dark.primary[500]
        }
      },
      light: {
        colors: {
          primary: tokens.light.primary[100],
          secondary: tokens.light.greenAccent[500],
          neutral: tokens.light.grey[500],
          background: '#fcfcfc'
        }
      }
    }
  },
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vuetify)
})
