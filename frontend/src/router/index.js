import Vue from 'vue';
import Router from 'vue-router';
import UserView from '@/views/UserView.vue';
import LoginView from '@/views/LoginView.vue';

Vue.use(Router);


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/users',
      name: 'Userts',
      component: UserView,
      meta: { requiresAuth: true } 
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next('/login');
  } else if (to.path === '/login' && isLoggedIn) {
    next('/users');
  } else {
    next(); 
  }
});

export default router;
