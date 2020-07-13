<template>
  <div>
    <Principal :product="product" />
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
      product: Object
    };
  },
  created() {
    this.product = this.$route.params.obj;
  }
};
</script>