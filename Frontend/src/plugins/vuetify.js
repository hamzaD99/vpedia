// Styles
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/main.scss'

// Vuetify
import { createVuetify } from 'vuetify'

const mainLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    secondaryBackground: '#F5F5F5',
    primary: '#2e8ac0',
    secondary: '#2e8ac0',
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
        lighten: 3,
        darken: 3,
      },
      themes: {
        mainLightTheme,
      },
    },
  }
)
