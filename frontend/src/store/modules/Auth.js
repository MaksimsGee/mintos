import ls from '@/util/LocalStorage';

const actions = {
  setToken({ commit }, token) {
    ls.write('auth:token', token);
    commit('SET_TOKEN', token);
  },
};

const mutations = {
  SET_TOKEN(s, token) {
    s.token = token;
  },
};

export default {
  state: {
    token: ls.read('auth:token') || null,
  },
  getters: {
    token: s => s.token,
  },
  mutations,
  actions,
  namespaced: true,
};
