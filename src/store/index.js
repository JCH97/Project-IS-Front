import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    user: {
      log: undefined,
      cart: []
    },
    tokens: undefined
  },
  mutations: {
    setProduct(state, prod) {
      state.products = prod;
    },
    setUser(state, user) {
      state.user.log = user;
      state.user.cart = [];
    },
    setTokens(state, tokens) {
      state.tokens = tokens;
    }
  },
  actions: {
    setProduct: function ({ commit }) {
      //petition to the server
      commit('setProduct', {});
    },
    setUser: function ({ commit }, user) {
      commit('setUser', user)
    },
    setTokens: function ({ commit, dispatch }, tokens) {
      commit('setTokens', tokens);
      dispatch('setUser', tokens.toWork)
    }
  },
  modules: {}
});
