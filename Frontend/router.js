import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './src/views/LoginPage.vue'
import FilmsPage from './src/views/FilmsPage.vue'
import { isLoggedin, isGuest } from './middleware'

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { title: 'تسجيل دخول - الموسوعة المرئية', middleware: isGuest }
  },
  {
    path: '/films',
    name: 'FilmsPage',
    component: FilmsPage,
    meta: { title: 'الأفلام - الموسوعة المرئية', middleware: isLoggedin }
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