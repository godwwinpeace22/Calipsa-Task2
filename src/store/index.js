import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currEvent: [],
  },
  mutations: {
    setCurrEvent(state, data) {
      state.currEvent = data;
    },
  },

  actions: {
    async setCurrEvent({ commit }, data) {
      commit("setCurrEvent", data);
    },
  },
});
