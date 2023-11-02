// Styles
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/main.scss'

// Vuetify
import { createVuetify } from 'vuetify'

const mainLightTheme = {
  dark: false,
  colors: {
    background: '#F5F5F5',
    primary: '#0075ca',
    secondary: '#FFD700',
    error: '#FF4444',
    info: '#5121F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    theme: {
      defaultTheme: 'mainLightTheme',
      variations: {
        colors: ['primary', 'secondary'],
        lighten: 2,
        darken: 2,
      },
      themes: {
        mainLightTheme,
      },
    },
  }
)
