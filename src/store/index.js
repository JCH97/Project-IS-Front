import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lengthCart: 0 // [{ product1, quantity1 }, { prodcut2, quantity2 }, ... 
  },
  mutations: {
    addToCart(state, len) {
      state.lengthCart = len;
    }
  },
  actions: {
    addToCart: function ({ commit }, data) { //data = { product: Object, quantity: number }
      let cart = Array.from(JSON.parse(localStorage.getItem('cartUserLog') || JSON.stringify([])));

      let len = 0;
      cart.forEach(e => { len += e.quantity });

      let obj = cart.find(e => e.product._id === data.product._id);
      if (obj)
        cart[cart.indexOf(obj)].quantity++;
      else
        cart.push(data);

      localStorage.setItem('cartUserLog', JSON.stringify(cart));

      commit('addToCart', len + 1);
    }
  },
  modules: {}
});
