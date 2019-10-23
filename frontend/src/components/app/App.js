import Debug from 'debug';
import Navbar from "../navbar/Navbar.vue";

const debug = Debug('component:app'); // eslint-disable-line

export default {
  components: {
    Navbar
  },
  mounted() {
    debug('mounted');
  }
};
