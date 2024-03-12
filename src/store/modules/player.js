// store/modules/player.js

export default {
  namespaced: true, // 모듈 네임스페이스 활성화

  state: {
    players: [],
    // 플레이어 상태 정의
    // 예: playerName, playerHP, playerLevel 등
  },
  mutations: {
    // 변이 정의
    setPlayers(state, payload) {
      state.players = payload;
    },
  },
  actions: {
    savePlayers({ commit }, players) {
      commit("setPlayers", players);
    },
  },
  getters: {
    getPlayers(state) {
      return state.players;
    },
  },
};
