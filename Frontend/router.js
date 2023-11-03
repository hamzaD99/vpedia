import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './src/views/LoginPage.vue'
import FilmsPage from './src/views/FilmsPage.vue'
const routes = [
  // {
  //   path: '/register',
  //   name: 'RegistrationPage',
  //   component: RegistrationPage,
  //   meta: { title: 'BrainBoost - Register' }
  // },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { title: 'تسجيل دخول - الموسوعة المرئية' }
  },
  {
    path: '/films',
    name: 'FilmsPage',
    component: FilmsPage,
    meta: { title: 'الأفلام - الموسوعة المرئية' }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'الموسوعة المرئية';
  next();
});
export default router;