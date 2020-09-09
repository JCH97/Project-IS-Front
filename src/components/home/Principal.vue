<template>
  <div>
    <FlashMessage :position="'right top'"></FlashMessage>
    <div class="main-content-wrapper d-flex clearfix">
      <Menu />
      <!-- Product Catagories Area Start -->
      <div class="products-catagories-area clearfix">
        <div class="amado-pro-catagory clearfix">
          <h2
            style="text-align: center;"
            class="w3-wide w3-opacity w3-animate-zoom"
          >Productos más vendidos</h2>

          <div class="w3-row">
            <div
              class="w3-row-padding w3-padding w3-responsive"
              v-for="index in Math.ceil(top.length / 3)"
              :key="index"
            >
              <div
                class="w3-col m4 s12 single-products-catagory clearfix w3-animate-zoom"
                v-if="top[(index - 1) * 3]"
              >
                <router-link :to="{ name: 'ProductDetail', params: { obj: top[(index - 1) * 3] } }">
                  <img :src="top[(index - 1) * 3].pictureUrl" alt />
                  <!-- Hover Content -->
                  <div class="hover-content">
                    <div class="line"></div>
                    <p>{{ top[(index - 1) * 3].price }}$</p>
                    <h4>{{ top[(index - 1) * 3].name }}</h4>
                  </div>
                </router-link>
              </div>
              <div
                class="w3-col m4 s12 single-products-catagory clearfix w3-animate-zoom"
                v-if="top[(index - 1) * 3 + 1]"
              >
                <router-link
                  :to="{ name: 'ProductDetail', params: { obj: top[(index - 1) * 3 + 1] } }"
                >
                  <img :src="top[(index - 1) * 3 + 1].pictureUrl" alt />
                  <!-- Hover Content -->
                  <div class="hover-content">
                    <div class="line"></div>
                    <p>{{ top[(index - 1) * 3 + 1].price }}$</p>
                    <h4>{{ top[(index - 1) * 3 + 1].name }}</h4>
                  </div>
                </router-link>
              </div>
              <div
                class="w3-col m4 s12 single-products-catagory clearfix w3-animate-zoom"
                v-if="top[(index - 1) * 3 + 2]"
              >
                <router-link
                  :to="{ name: 'ProductDetail', params: { obj: top[(index - 1) * 3 + 2] } }"
                >
                  <img :src="top[(index - 1) * 3 + 2].pictureUrl" alt />
                  <!-- Hover Content -->
                  <div class="hover-content">
                    <div class="line"></div>
                    <p>{{ top[(index - 1) * 3 + 2].price }}$</p>
                    <h4>{{ top[(index - 1) * 3 + 2].name }}</h4>
                  </div>
                </router-link>
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
import Menu from "@/components/Menu.vue";
export default {
  name: "Principal",
  components: {
    Menu
  },
  data() {
    return {
      top: []
    };
  },
  mounted() {
    this.axios
      .get("/api/part/top/9", { headers: this.headers })
      .then(data => {
        this.top = data.data;
      })
      .catch(err => {
        this.flashMessage.error({
          title: "Error!!!!",
          message: err.response.data.error
        });
      });
  },
  computed: {
    ...mapState(["headers"])
  }
};
</script>