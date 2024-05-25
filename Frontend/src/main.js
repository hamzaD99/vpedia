import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import { loadFonts } from './plugins/webfontloader'
import router from '../router'
import axios from 'axios';
import store from './store/store'
import i18n from './i18n'
import VueNumber from 'vue-number-animation'

const baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_PROD : process.env.VUE_APP_API_DEV

const axiosInstance = axios.create({
  baseURL: baseURL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getters.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch('logout')
      if(!error.response && error.response.data == "Wrong Credentials") router.push('/')
    }
    return error;
  }
);


loadFonts()
const app = createApp(App)
app.use(i18n)
app.use(vuetify)
app.use(router)
app.use(store)
app.use(VueNumber)
app.mount('#app')
app.config.globalProperties.$axios = { ...axiosInstance }
const validationRules = {
  nameRules: [
    value => !!value || i18n.global.t('Name is required'),
  ],
  emailRules: [
    (value) => !!value || i18n.global.t('Email is required'),
    (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || i18n.global.t('Email must be valid')
  ],
  passwordRules: [
    (value) => !!value || i18n.global.t('This field is required'),
    (value) => value.length >= 8 || i18n.global.t('Password must be at least 8 characters'),
    (value) => /[A-Z]/.test(value) || i18n.global.t('Password must contain an uppercase letter'),
    (value) => /[a-z]/.test(value) || i18n.global.t('Password must contain a lowercase letter'),
    (value) => /\d/.test(value) || i18n.global.t('Password must contain a digit'),
    (value) => /[!@#$%^&*]/.test(value) || i18n.global.t('Password must contain a special character'),
  ],
  requiredRule: [
    (value) => !!value || i18n.global.t('This field is required'),
  ]
}
app.config.globalProperties.$rules = {...validationRules}

const error = (err, message="Something Went Wrong!") =>{
  console.error(err)
  store.dispatch('showSnackbar',{ message: i18n.global.t(message) })
}
app.config.globalProperties.$error = error

const isActiveUser = (element) => {
  if(!element || !element.Subscriptions || !element.Subscriptions.length) return false
  const expiredAtDates = element.Subscriptions.map((subscription) => subscription.expiredAt)
  if(!expiredAtDates.length) return false
  let dateObjects = expiredAtDates.map(dateString => new Date(dateString));
  const maxExpiredAtDate = new Date(Math.max(...dateObjects.map(date => date.getTime())));
  const currentDate = new Date();
  if (maxExpiredAtDate < currentDate) return false
  return true
}

app.config.globalProperties.$filters = { isActiveUser }