import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from 'axios'
import vueAxios from 'vue-axios'
import flashMessage from "@smartweb/vue-flash-message";

Vue.config.productionTip = false;
Vue.use(vueAxios, axios)
Vue.use(flashMessage);

axios.defaults.baseURL = "http://localhost:3000"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
