<template>
  <div>
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
            <div class="w3-row-padding w3-padding" v-for="(item) in top" :key="item._id">
              <div class="w3-col m4 single-products-catagory clearfix w3-animate-left">
                <router-link :to="{ name: 'ProductDetail', params: { obj: item.f } }">
                  <img src="img/bg-img/1.jpg" alt />
                  <!-- Hover Content -->
                  <div class="hover-content">
                    <div class="line"></div>
                    <p>{{ item.f.price }}$</p>
                    <h4>{{ item.f.name }}</h4>
                  </div>
                </router-link>
              </div>
              <div class="w3-col m4 single-products-catagory clearfix w3-animate-zoom">
                <router-link :to="{ name: 'ProductDetail', params: { obj: item.s } }">
                  <img src="img/bg-img/1.jpg" alt />
                  <!-- Hover Content -->
                  <div class="hover-content">
                    <div class="line"></div>
                    <p>{{ item.s.price }}$</p>
                    <h4>{{ item.s.name }}</h4>
                  </div>
                </router-link>
              </div>
              <div class="w3-col m4 single-products-catagory clearfix w3-animate-right">
                <router-link :to="{ name: 'ProductDetail', params: { obj: item.t } }">
                  <img src="img/bg-img/1.jpg" alt />
                  <!-- Hover Content -->
                  <div class="hover-content">
                    <div class="line"></div>
                    <p>{{ item.t.price }}$</p>
                    <h4>{{ item.t.name }}</h4>
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
      .get("/api/part/top/9", {
        headers: {
          "x-access-token": localStorage.getItem(
            "accessToken" || JSON.stringify("")
          )
        }
      })
      .then(data => {
        this.top = data.data;
      });
  }
};
</script>