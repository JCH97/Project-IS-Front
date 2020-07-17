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
        <router-link to="/">
          <img src="img/core-img/logo.png" alt />
        </router-link>
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
          <div v-if="user">
            <li id="li-cart" @click="changeClassMenu('li-cart')">
              <router-link to="/cart">
                Cart
                <span class="w3-badge w3-orange">{{ this.cartUserLog.length }}</span>
              </router-link>
            </li>
            <li id="li-checkout" @click="changeClassMenu('li-checkout')">
              <a href="checkout.html">Checkout</a>
            </li>
          </div>
          <li v-if="!user">
            <router-link to="/authenticate">Login</router-link>
          </li>
          <li v-else>
            <p>Bienvenido, {{ this.user.userName }}</p>
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
export default {
  name: "Menu",
  data() {
    return {
      user: {},
      cartUserLog: []
    };
  },
  created() {
    this.user = JSON.parse(
      localStorage.getItem("user") || JSON.stringify(null)
    );
    this.cartUserLog = JSON.parse(
      localStorage.getItem("cartUserLog") || JSON.stringify([])
    );
  },
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
    lengthCart() {
      return JSON.parse(
        localStorage.getItem("cartUserLog") || JSON.stringify([])
      );
    }
  }
};
</script>