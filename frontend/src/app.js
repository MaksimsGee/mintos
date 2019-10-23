import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Toasted from 'cxlt-vue2-toastr';
import App from '@/components/app/App.vue';
import Router from '@/router';
import Store from '@/store/state';
import Inject from '@/util/InjectServices';

Vue.config.productionTip = false;

// Plugins
Vue.use(Inject);
Vue.use(Toasted, { position: 'top right', progressBar: true, closeButton: true, timeOut: 5000 });
Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: Store,
  router: Router,
  components: {
    app: App,
  },
  template: '<app/>',
});
