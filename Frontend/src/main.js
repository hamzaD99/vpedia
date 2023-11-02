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
  baseURL: 'http://localhost:8000/api/v1/',
});

loadFonts()

const app = createApp(App).use(i18n)
app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')
app.config.globalProperties.$axios = { ...axiosInstance }
