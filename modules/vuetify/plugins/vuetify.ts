import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createVuetify } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

const darkColors = genColors('dark')
const lightColors = genColors('light')

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
          primary: darkColors['primary-500'],
          secondary: darkColors['greenAccent-500'],
          neutral: darkColors['grey-500'],
          background: darkColors['primary-500'],
          ...darkColors
        }
      },
      light: {
        colors: {
          primary: lightColors['primary-100'],
          secondary: lightColors['greenAccent-500'],
          neutral: lightColors['grey-500'],
          background: '#fcfcfc',
          ...lightColors
        }
      }
    }
  },
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vuetify)
})
