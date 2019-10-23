import Debug from 'debug';
import { mapState } from 'vuex';

const debug = Debug('component:login'); // eslint-disable-line

export default {
  dependencies: [
    'AuthService',
  ],
  data() {
    return {
      email: '',
      password: '',
      autoLoginInProgress: true,
    };
  },
  computed: {
    ...mapState('Auth', {
      token: state => state.token,
    }),
    ...mapState('Router', {
      routerLast: state => state.last,
    }),
  },
  methods: {
    tryLogin() {
      this.AuthService
        .login(this.email, this.password)
        .then(res => {
          debug('success: %o', res);
          this.$toast.success({ title: 'Success', message: 'You are successfully logged in!' });
          this.$router.push({ name: 'feed' });
        })
        .catch(err => {
          this.$toast.error({ title: 'Error occurred', message: err.message });
        });
    },
  },
  mounted() {
    const fin = () => this.autoLoginInProgress = false;

    if (this.token) {
      this.$router.replace(this.routerLast);
    } else {
      fin();
      this.$nextTick(() => {
        this.$refs.email.$el.focus();
      });
    }
  },
};
