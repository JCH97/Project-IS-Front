<template>
  <div>
    <Principal />
    <Footer />
  </div>
</template>

<script>
import Principal from "@/components/cart/Principal.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Cart",
  components: {
    Principal,
    Footer
  }
};
</script>