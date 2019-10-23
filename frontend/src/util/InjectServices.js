import Injector from 'vue-inject';

const serviceRequireContext = require.context('@/services', false, /\.js$/);

serviceRequireContext
  .keys()
  .forEach(fileName => serviceRequireContext(fileName));

export default Injector;
