const actions = {
  setLast({ commit }, route) {
    commit('SET_ROUTER_LAST', route);
  },
};

const mutations = {
  SET_ROUTER_LAST(s, route) {
    s.last = route;
  },
};

export default {
  state: {
    last: '/',
  },
  getters: {
    last: s => s.last,
  },
  mutations,
  actions,
  namespaced: true,
};
