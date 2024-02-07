// store/index.js

import Vue from "vue";
import Vuex from "vuex";
import player from "./modules/player";
import monster from "./modules/monster";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    player,
    monster,
    // 다른 모듈이 있다면 추가
  },
});
