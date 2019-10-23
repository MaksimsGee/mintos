import { get } from '@/util/ApiReader';
import Debug from 'debug';

const debug = Debug('store:excludes'); // eslint-disable-line

const actions = {
  download({ commit, state }) { // eslint-disable-line
    if (!state.excludes.length) {
      return get('excludes')
        .then(res => {
          res.excludes.forEach(el => {
            commit('SET_EXCLUDES', el.name);
          });

          return res;
        })
        .catch(err => { throw err; });
    }
    return state.excludes;
  },
};

const mutations = {
  SET_EXCLUDES(s, exclude) {
    s.excludes.add(exclude);
  },
};

export default {
  state: {
    excludes: new Set(),
  },
  getters: {
    excludes: s => s.excludes,
  },
  mutations,
  actions,
  namespaced: true,
};

