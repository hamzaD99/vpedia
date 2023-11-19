import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './src/views/LoginPage.vue'
import FilmsPage from './src/views/FilmsPage.vue'
import HomePage from './src/views/HomePage.vue'
import AboutUsPage from './src/views/AboutUsPage.vue'
import { isLoggedin, isGuest } from './middleware'
import i18n from './src/i18n'

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { title: `${i18n.global.t('Login')} - ${i18n.global.t('Vpedia')}`, middleware: isGuest }
  },
  {
    path: '/films',
    name: 'FilmsPage',
    component: FilmsPage,
    meta: { title: `${i18n.global.t('Films')} - ${i18n.global.t('Vpedia')}` }
  },
  {
    path: '/about-us',
    name: 'AboutUsPage',
    component: AboutUsPage,
    meta: { title: `${i18n.global.t('About Us')} - ${i18n.global.t('Vpedia')}` }
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: { title: i18n.global.t('Vpedia') }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'الموسوعة المرئية';
  if (to.meta.middleware) {
    to.meta.middleware({ to, from, next });
  }
  next();
});

export default router;