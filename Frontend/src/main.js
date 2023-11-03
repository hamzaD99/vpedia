import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import { loadFonts } from './plugins/webfontloader'
import router from '../router'
import axios from 'axios';
import store from './store/store'
import i18n from './i18n'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
});

loadFonts()

const app = createApp(App)
app.use(i18n)
app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')
app.config.globalProperties.$axios = { ...axiosInstance }

const validationRules = {
  nameRules: [
    value => !!value || 'Name is required',
  ],
  emailRules: [
    (value) => !!value || 'Email is required',
    (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'E-mail must be valid'
  ],
  passwordRules: [
    (value) => !!value || app._instance.ctx.$t('This field is required'),
    (value) => value.length >= 8 || app._instance.ctx.$t('Password must be at least 8 characters'),
    (value) => /[A-Z]/.test(value) || app._instance.ctx.$t('Password must contain an uppercase letter'),
    (value) => /[a-z]/.test(value) || app._instance.ctx.$t('Password must contain a lowercase letter'),
    (value) => /\d/.test(value) || app._instance.ctx.$t('Password must contain a digit'),
    (value) => /[!@#$%^&*]/.test(value) || app._instance.ctx.$t('Password must contain a special character'),
  ],
  loginHandleRules: [
    (value) => !!value || app._instance.ctx.$t('This field is required'),
  ]
}
app.config.globalProperties.$rules = {...validationRules}