import Injector from 'vue-inject';
import Debug from 'debug';
import { authEventBus, post } from '@/util/ApiReader'; // eslint-disable-line
import { apiSlug, API_SYMFONY } from '@/util/Functions';

const debug = Debug('service:Auth'); // eslint-disable-line

export default class AuthService {
  constructor($context) {
    this.vue = $context;
    authEventBus.$on('logout:force', () => this.logout());
  }

  login(email, password) {
    let requestBody = { email, password };

    if (apiSlug() === API_SYMFONY) {
      requestBody = { username: email, password };
    }
    return post('login', requestBody)
      .then(res => {
        this.vue.$store.dispatch('Auth/setToken', res.token);
        return res;
      }).catch(err => {
        this.logout(false);
        throw err;
      });
  }

  logout() {
    this.vue.$store.dispatch('Auth/setToken', null);
    this.vue.$router.push({ name: 'login' });
  }
}

Injector.service('AuthService', ['$context'], AuthService);
