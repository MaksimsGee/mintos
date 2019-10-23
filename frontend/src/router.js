import Vue from 'vue';
import Router from 'vue-router';
import Debug from 'debug';
import store from '@/store/state';
import Login from '@/components/login/Login.vue';
import Register from '@/components/register/Register.vue';
import NotFound from '@/components/not-found/NotFound.vue';
import Feed from '@/components/feed/Feed.vue';

const debug = Debug('router');
const unauthorizedRoutes = ['login', 'register']; // eslint-disable-line

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '', redirect: '/feed' },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/feed', name: 'feed', component: Feed },
    { path: '*', name: 'not-found', component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  // Redirect non-authorized users to /login
  debug(from, to, store.getters['Auth/token'], unauthorizedRoutes.indexOf(to.name));

  if (
    unauthorizedRoutes.indexOf(to.name) < 0
    && !store.getters['Auth/token']
  ) {
    debug('redirecting non-authed user to /login');
    store.dispatch('Router/setLast', to.fullPath);
    return next('/login');
  }

  debug('opening %s (%s) params: %j', to.name, to.path, to.params);
  return next();
});

router.afterEach(to => {
  debug('navigated to %s', to.fullPath);
  if (to.name !== 'login') {
    store.dispatch('Router/setLast', to.fullPath);
  }
});

export default router;
