import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cartUserLog: [] // [{ product1, quantity1 }, { prodcut2, quantity2 }, ... 
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
    },
    addToCart(state, data) {
      state.cartUserLog.push(data);
    }
  },
  actions: {
    setProduct: function ({ commit }) {
      commit('setProduct', {});
    },
    setUser: function ({ commit }, user) {
      commit('setUser', user)
    },
    setTokens: function ({ commit, dispatch }, tokens) {
      commit('setTokens', tokens);
      dispatch('setUser', tokens.toWork)
    },
    addToCart: function ({ commit }, data) { //data = { product: Object, quantity: number }
      let cart = JSON.parse(localStorage.getItem('cartUserLog') || JSON.stringify([]));
      cart.push(JSON.stringify(data));
      localStorage.setItem('cartUserLog', JSON.stringify(cart));

      console.log(commit);
    }
  },
  modules: {}
});
