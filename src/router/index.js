import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Shop from "../views/Shop.vue"
import Login from "../views/Login.vue";
import ProductDetail from "../views/ProductDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop
  },
  {
    path: "/authenticate",
    name: "Login",
    component: Login
  },
  {
    path: "/productDetail/:obj",
    name: "ProdcutDetail",
    component: ProductDetail,
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
