import { get } from '@/util/ApiReader';
import Debug from 'debug';

const debug = Debug('store:feed'); // eslint-disable-line

const actions = {
  download({ commit, state }) { // eslint-disable-line
    if (!state.feed.length) {
      return get('feed')
        .then(res => {
          commit('SET_STATE', { key: 'feed', data: res.feed.entry });
          commit('SET_STATE', { key: 'author', data: res.feed.author });
          commit('SET_STATE', { key: 'logo', data: res.feed.logo });
          commit('SET_STATE', { key: 'title', data: res.feed.title });
          commit('SET_STATE', { key: 'subtitle', data: res.feed.subtitle });
          commit('SET_STATE', { key: 'plain', data: res.plain });

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
    plain: '',
  },
  getters: {
    feed: s => s.feed,
    author: s => s.author,
    logo: s => s.logo,
    title: s => s.title,
    subtitle: s => s.subtitle,
    plain: s => s.plain,
  },
  mutations,
  actions,
  namespaced: true,
};
