import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './src/views/LoginPage.vue'
import RegistrationPage from './src/views/RegistrationPage.vue';
import TermsPage from './src/views/TermsPage.vue';

const routes = [
  {
    path: '/register',
    name: 'RegistrationPage',
    component: RegistrationPage,
    meta: { title: 'BrainBoost - Register' }
  },
  {
    path: '/terms',
    name: 'TermsPage',
    component: TermsPage,
    meta: { title: 'BrainBoost - Terms' }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { title: 'BrainBoost - Login' }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'BrainBoost';
  next();
});
export default router;