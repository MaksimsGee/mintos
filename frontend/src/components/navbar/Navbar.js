import Debug from 'debug';
import { mapState } from 'vuex';

const debug = Debug('component:Navbar');

export default {
  dependencies: ['AuthService'],
  computed: {
    ...mapState('Auth', {
      token: state => state.token,
    }),
    goHome() {
      return '/';
    },
  },
  methods: {
    logout() {
      this.AuthService.logout();
      this.$toast.success({ title: 'Success', message: 'You are successfully logged out' });
    },
  },
  mounted() {
    debug('mounted.');
  },
};
