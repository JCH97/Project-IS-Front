<template>
  <div>
    <Principal />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Principal from "@/components/home/Principal.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Principal,
    Footer
  }
};
</script>
