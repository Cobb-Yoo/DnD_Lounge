// store/modules/monster.js

export default {
  namespaced: true,

  state: {
    monsters: [],
  },
  mutations: {
    setMonsters(state, payload) {
      state.monsters = payload;
    },
  },
  actions: {
    saveMonsters({ commit }, monsters) {
      commit("setMonsters", monsters);
    },
  },
  getters: {
    getMonsters(state) {
      return state.monsters;
    },
  },
};
