import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from 'axios'
import vueAxios from 'vue-axios'
import flashMessage from "@smartweb/vue-flash-message";
import BootstrapVue from 'bootstrap-vue'
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.use(vueAxios, axios)
Vue.use(flashMessage);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

axios.defaults.baseURL = "http://localhost:4000"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
