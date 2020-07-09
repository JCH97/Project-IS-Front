<template>
  <div>
    <div class="main-content-wrapper d-flex clearfix">
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
            <li class="active">
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/shop">Shop</router-link>
            </li>
            <div v-if="this.user.log">
              <li>
                <a href="product-details.html">Product</a>
              </li>
              <li>
                <a href="cart.html">Cart</a>
              </li>
              <li>
                <a href="checkout.html">Checkout</a>
              </li>
            </div>
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

      <!-- Product Catagories Area Start -->
      <div class="products-catagories-area clearfix">
        <div class="amado-pro-catagory clearfix">
          <h2
            style="text-align: center;"
            class="w3-wide w3-opacity w3-animate-zoom"
          >Productos más vendidos</h2>

          <div class="w3-row">
            <div class="w3-row-padding w3-padding" v-for="(item) in top" :key="item._id">
              <div class="w3-col m4 single-products-catagory clearfix w3-animate-left">
                <a href="shop.html">
                  <img src="img/bg-img/1.jpg" alt />
                  <!-- Hover Content -->
                  <div class="hover-content">
                    <div class="line"></div>
                    <p>{{ item.f.price }}$</p>
                    <h4>{{ item.f.name }}</h4>
                  </div>
                </a>
              </div>
              <div class="w3-col m4 single-products-catagory clearfix w3-animate-zoom">
                <a href="shop.html">
                  <img src="img/bg-img/1.jpg" alt />
                  <!-- Hover Content -->
                  <div class="hover-content">
                    <div class="line"></div>
                    <p>{{ item.s.price }}$</p>
                    <h4>{{ item.s.name }}</h4>
                  </div>
                </a>
              </div>
              <div class="w3-col m4 single-products-catagory clearfix w3-animate-right">
                <a href="shop.html">
                  <img src="img/bg-img/1.jpg" alt />
                  <!-- Hover Content -->
                  <div class="hover-content">
                    <div class="line"></div>
                    <p>{{ item.t.price }}$</p>
                    <h4>{{ item.t.name }}</h4>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Product Catagories Area End -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Principal",
  data() {
    return {
      top: []
    };
  },
  mounted() {
    this.axios.get("/api/part/top/9").then(data => (this.top = data.data));
  },
  methods: {
    changeClass() {
      let d = document.querySelector("header");

      if (d.classList.contains("bp-xs-on")) d.classList.remove("bp-xs-on");
      else d.classList.add("bp-xs-on");
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>