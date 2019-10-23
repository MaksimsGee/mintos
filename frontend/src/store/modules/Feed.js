import { get } from '@/util/ApiReader';
import Debug from 'debug';

const debug = Debug('store:feed'); // eslint-disable-line

const actions = {
  download({ commit, state }) { // eslint-disable-line
    if (!state.feed.length) {
      return get('feed')
        .then(res => {
          commit('SET_STATE', { key: 'feed', data: res.entry });
          commit('SET_STATE', { key: 'author', data: res.author });
          commit('SET_STATE', { key: 'logo', data: res.logo });
          commit('SET_STATE', { key: 'title', data: res.title });
          commit('SET_STATE', { key: 'subtitle', data: res.subtitle });

          return res;
        })
        .catch(err => { throw err; });
    }
    return state.feed;
  },
};

const mutations = {
  SET_STATE(s, { key, data }) {
    s[key] = data;
  },
};

export default {
  state: {
    feed: [],
    author: {},
    logo: '',
    title: '',
    subtitle: '',
  },
  getters: {
    feed: s => s.feed,
    author: s => s.author,
    logo: s => s.logo,
    title: s => s.title,
    subtitle: s => s.subtitle,
  },
  mutations,
  actions,
  namespaced: true,
};
