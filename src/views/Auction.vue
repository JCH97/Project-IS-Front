<template>
  <div>
    <Principal />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Principal from "@/components/auction/principal.vue";
export default {
  name: "Auction",
  components: {
    Principal,
    Footer
  }
};
</script>