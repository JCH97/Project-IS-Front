import Vue from "vue";
import Vuex from "vuex";
import * as cookies from "vue-cookies";
import * as axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lengthCart: 0, // [{ product1, quantity1 }, { prodcut2, quantity2 }, ... 
    lengthAuction: 0,
    headers: {
      Authorization: `bearer ${cookies.get("user_access_token")}`
    }
  },
  mutations: {
    setLength(state, len) {
      state.lengthCart = len;
    },
    setLengthAuct(state, len) {
      state.lengthAuction = len;
    }
  },
  actions: {
    addToCart: function ({ dispatch }, data) { //data = { product: Object, quantity: number }      
      if (data.product.stock < 0) return;
      axios.post('/cart', { data: { product: data.product._id, amount: data.quantity } }, {
        headers: {
          "Authorization": `bearer ${cookies.get('user_access_token')}`
        }
      });

      dispatch('setLengthCart');
    },
    setLengthCart: function ({ commit }) {

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
    setLengthAuction: function ({ commit }) {

      axios.get('/auction/length', {
        headers: {
          "Authorization": `bearer ${cookies.get('user_access_token')}`
        }
      }).then(res => {
        commit('setLengthAuct', res.data);
      })
        .catch(e => console.log(e));

    }
  },
  modules: {}
});
