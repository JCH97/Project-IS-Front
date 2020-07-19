<template>
  <div>
    <Principal :isAdmin="isAdmin" />
    <Footer />
  </div>
</template>

<script>
import Principal from "@/components/shop/Principal.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Shop",
  components: {
    Principal,
    Footer
  },
  data() {
    return {
      isAdmin: false
    };
  },
  created() {
    this.isAdmin =
      JSON.parse(localStorage.getItem("user") || JSON.stringify({})).isAdmin ||
      false;
  }
};
</script>