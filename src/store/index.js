import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    result: localStorage.getItem('result-history') || new Array(),
  },
  mutations: {
    pushResult(state, result) {
      state.result.push(result);
    },
  },
  actions: {
    addResult({ commit }, { result }) {
      commit('pushResult', result);
      localStorage.setItem('result-history', result);
    },
  },
  modules: {},
  getters: {
    isEmpty: (s) => !!s.result,
    result: (s) => s.result,
  },
});
