<template>
  <div>
    <User />
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
            <li v-if="lengthCart > 0" id="li-cart" @click="changeClassMenu('li-cart')">
              <router-link to="/cart">
                Cart
                <span class="w3-badge w3-orange">{{ this.lengthCart }}</span>
              </router-link>
            </li>
            <li v-if="user.roles && user.roles.includes('ADMIN')" id="li-user">
              <router-link to>
                <div v-b-modal.modalTableUser>User</div>
              </router-link>
            </li>
          </div>
          <div class="mt-5">
            <li v-if="!user">
              <router-link to="/authenticate">Login</router-link>
            </li>
            <li v-else>
              <p>Welcome, {{ this.user.email }}</p>
            </li>
          </div>
        </ul>
      </nav>
      <!-- Button Group -->
      <div class="amado-btn-group mt-30 mb-100">
        <h1 class="btn amado-btn mb-15">Discount: {{ this.user.discount }}%</h1>
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
import User from "@/components/home/User.vue";
export default {
  name: "Menu",
  components: {
    User
  },
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.axios
      .get("/user/me", { headers: this.$store.state.headers })
      .then(res => (this.user = res.data))
      .catch(e => { if(e.response.status === 401) this.$router.push("/authenticate"); });

    this.$store.dispatch("lengthCart");
  },
  methods: {
    changeClass: function() {
      let d = document.querySelector("header");

      if (d.classList.contains("bp-xs-on")) d.classList.remove("bp-xs-on");
      else d.classList.add("bp-xs-on");
    },
    changeClassMenu: function(id) {
      document.querySelector("li.active").classList.remove("active");
      document.querySelector(`#${id}`).classList.add("active");
    }
  },
  computed: {
    ...mapState(["lengthCart"])
  }
};
</script>