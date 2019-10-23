import Debug from 'debug';
import _ from 'lodash';
import api from '@/util/ApiReader';

const debug = Debug('component:register'); // eslint-disable-line

export default {
  data() {
    return {
      errors: null,
      formData: {
        email: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  computed: {
    stateEmail() {
      if (this.formData.email.length < 1) {
        return null;
      }
      return this.validEmail(this.formData.email)
        && !_.get(this.errors, 'email', null);
    },
    statePassword() {
      const passwordErrors = _.get(this.errors, 'password', null);
      return passwordErrors === null ? null : false;
    },
    stateRePassword() {
      const rePasswordErrors = _.get(this.errors, 'password_confirmation', null);
      return rePasswordErrors === null ? null : false;
    },
    invalidFeedbackEmail() {
      if (this.formData.email.length < 1) {
        return '';
      }
      if (!this.validEmail(this.formData.email)) {
        return 'email is not valid';
      }
      // TODO: clean errors.email state after message
      return this.getResponseErrorByKey('email');
    },
    validFeedbackEmail() {
      return this.stateEmail === true ? 'Seems fine, click register' : '';
    },
    invalidFeedbackPassword() {
      return this.getResponseErrorByKey('password');
    },
    invalidFeedbackRePassword() {
      return this.getResponseErrorByKey('password_confirmation');
    },
  },
  methods: {
    getResponseErrorByKey(key = 'email') {
      const fieldErrors = _.get(this.errors, key, []);
      if (!_.isEmpty(fieldErrors)) {
        return _.join(fieldErrors, ', ');
      }
      return '';
    },
    validEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
      return re.test(email);
    },
    createUser() {
      api.post('register', this.formData)
        .then(res => {
          this.formData = {
            email: '',
            password: '',
            password_confirmation: '',
          };
          this.errors = null;
          this.$toast.success({ title: 'Success', message: res.message });
        })
        .catch(err => {
          this.errors = err.errors || [];
          this.$toast.error({ title: 'Error occurred', message: err.message });
        });
    },
  },
  mounted() {
    debug('mounted.');
  },
};
