<template>
  <div>
    <Principal :productId="productId" />
    <Footer />
  </div>
</template>

<script>
import Principal from "@/components/productDetail/Principal.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "ProductDetail",
  components: {
    Principal,
    Footer
  },
  data() {
    return {
      productId: String
    };
  },
  created() {
    this.productId = this.$route.params.productId;
  }
};
</script>