import Vue from "vue";
import Vuex from "vuex";
import * as cookies from "vue-cookies";
import * as axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lengthCart: 0, // [{ product1, quantity1 }, { prodcut2, quantity2 }, ... 
    headers: {
      Authorization: `bearer ${cookies.get("user_access_token")}`
    }
  },
  mutations: {
    setLength(state, len) {
      state.lengthCart = len;
    }
  },
  actions: {
    // addToCart: function ({ dispatch }, data) { //data = { product: Object, quantity: number }
    //   if (data.product.stock === 0) return;

    //   let cart = Array.from(JSON.parse(localStorage.getItem('cartUserLog') || JSON.stringify([])));

    //   let obj = cart.find(e => e.product._id === data.product._id);
    //   if (obj)
    //     cart[cart.indexOf(obj)].quantity++;
    //   else
    //     cart.push(data);

    //   localStorage.setItem('cartUserLog', JSON.stringify(cart));

    //   dispatch('setLength');
    // },
    lengthCart: function ({ commit }) {

      axios.get('/cart/length', {
        headers: {
          "Authorization": `bearer ${cookies.get('user_access_token')}`
        }
      }).then(res => {
        commit('setLength', res.data);
      })
        .catch(e => {
          console.error(e);
        });

    },
  },
  modules: {}
});
