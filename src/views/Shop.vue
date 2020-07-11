<template>
  <div>
    <Principal />
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
  }
};
</script>