import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    result: JSON.parse(localStorage.getItem('result-history')) || [],
  },
  mutations: {
    pushResult(state, result) {
      state.result.unshift(result);
    },
    clearResult(state) {
      state.result = [];
    },
  },
  actions: {
    addResult({ commit }, result) {
      commit('pushResult', result);
      localStorage.setItem('result-history', JSON.stringify(this.state.result));
    },
    clearHistory({ commit }) {
      commit('clearResult');
      localStorage.removeItem('result-history');
    },
  },
  modules: {},
  getters: {
    isContains: (s) => !!s.result.length,
    result: (s) => s.result,
  },
});
