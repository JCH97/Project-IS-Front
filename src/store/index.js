import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    user: {
      log: undefined,
      cart: []
    }
  },
  mutations: {
    setProduct(state, prod) {
      state.products = prod;
    },
    setUser(state, user) {
      state.user.log = user.log;
      state.user.cart = user.cart || [];
    }
  },
  actions: {
    setProduct: function ({ commit }) {
      //petition to the server
      commit('setProduct', {});
    },
    setUser: function ({ commit }, user) {
      commit('setUser', user)
    }
  },
  modules: {}
});
