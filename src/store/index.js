import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lengthCart: 0, // [{ product1, quantity1 }, { prodcut2, quantity2 }, ... 
    headers: {
      "x-access-token": localStorage.getItem("accessToken" || JSON.stringify(""))
    }
  },
  mutations: {
    setLength(state, len) {
      state.lengthCart = len;
    }
  },
  actions: {
    addToCart: function ({ dispatch }, data) { //data = { product: Object, quantity: number }
      let cart = Array.from(JSON.parse(localStorage.getItem('cartUserLog') || JSON.stringify([])));

      let obj = cart.find(e => e.product._id === data.product._id);
      if (obj)
        cart[cart.indexOf(obj)].quantity++;
      else
        cart.push(data);

      localStorage.setItem('cartUserLog', JSON.stringify(cart));

      dispatch('setLength');
    },
    setLength: function ({ commit }) {
      let cart = Array.from(JSON.parse(localStorage.getItem('cartUserLog') || JSON.stringify([])));
      let len = 0;
      cart.forEach(e => { len += e.quantity });

      commit('setLength', len);
    },
  },
  modules: {}
});
