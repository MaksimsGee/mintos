import Vue from 'vue';
import Vuex from 'vuex';
import Debug from 'debug';

const debug = Debug('vuex:State'); // eslint-disable-line no-unused-vars

Vue.use(Vuex);

const originalContext = require.context('./modules/', false, /\.js$/);
const modules = (context) => {
  const res = {};
  context.keys().map(k => res[k.slice(2, -3)] = context(k).default);
  return res;
};

const state = new Vuex.Store({
  modules: modules(originalContext),
  strict: true,
});

export default state;

if (module.hot) {
  module.hot.accept(originalContext.id, () => {
    state.hotUpdate({ modules: modules(require.context('./modules/', false, /\.js$/)) });
  });
}
