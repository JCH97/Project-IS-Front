<template>
  <div>
    <!-- Mobile Nav (max width 767px)-->
    <div class="mobile-nav">
      <!-- Navbar Brand -->
      <div class="amado-navbar-brand">
        <router-link to="/">
          <img src="img/core-img/logo.png" alt="Logo" />
        </router-link>
      </div>
      <!-- Navbar Toggler -->
      <div class="amado-navbar-toggler" @click="changeClass()">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- Header Area Start -->
    <header id="header" class="header-area clearfix">
      <!-- Close Icon -->
      <div class="nav-close" @click="changeClass()">
        <i class="fa fa-close" aria-hidden="true"></i>
      </div>
      <!-- Logo -->
      <div class="logo">
        <a href="index.html">
          <img src="img/core-img/logo.png" alt />
        </a>
      </div>
      <!-- Amado Nav -->
      <nav class="amado-nav">
        <ul>
          <li class="active" id="li-home" @click="changeClassMenu('li-home')">
            <router-link to="/">Home</router-link>
          </li>
          <li id="li-shop" @click="changeClassMenu('li-shop')">
            <router-link to="/shop">Shop</router-link>
          </li>
          <div v-if="user.log">
            <li id="li-product" @click="changeClassMenu('li-product')">
              <a href="product-details.html">Product</a>
            </li>
            <li id="li-cart" @click="changeClassMenu('li-cart')">
              <a href="cart.html">Cart</a>
            </li>
            <li id="li-checkout" @click="changeClassMenu('li-checkout')">
              <a href="checkout.html">Checkout</a>
            </li>
          </div>
          <li v-if="!user.log">
            <router-link to="/authenticate">Login</router-link>
          </li>
          <li v-else>
            <p>Bienvenido, {{ this.user.log.userName }}</p>
          </li>
        </ul>
      </nav>
      <!-- Button Group -->
      <div class="amado-btn-group mt-30 mb-100">
        <a href="#" class="btn amado-btn mb-15">%Discount%</a>
        <a href="#" class="btn amado-btn active">New this week</a>
      </div>
      <!-- Social Button -->
      <div class="social-info d-flex justify-content-between">
        <a href="#">
          <i class="fa fa-pinterest" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i class="fa fa-instagram" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i class="fa fa-facebook" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i class="fa fa-twitter" aria-hidden="true"></i>
        </a>
      </div>
    </header>
    <!-- Header Area End -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Menu",
  methods: {
    changeClass() {
      let d = document.querySelector("header");

      if (d.classList.contains("bp-xs-on")) d.classList.remove("bp-xs-on");
      else d.classList.add("bp-xs-on");
    },
    changeClassMenu(id) {
      document.querySelector("li.active").classList.remove("active");
      document.querySelector(`#${id}`).classList.add("active");
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>