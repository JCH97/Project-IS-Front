<template>
  <div>
    <FlashMessage :position="'right top'"></FlashMessage>
    <div class="main-content-wrapper d-flex clearfix">
      <Menu />
      <!-- Product Details Area Start -->
      <div class="single-product-area section-padding-100 clearfix">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mt-50">
                  <li class="breadcrumb-item">
                    <router-link to="/">Home</router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <router-link to>{{ this.product.category.name }}</router-link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-7">
              <div class="single_product_thumb">
                <div id="product_details_slider" class="carousel slide" data-ride="carousel">
                  <ol class="carousel-indicators">
                    <li
                      class="active"
                      data-target="#product_details_slider"
                      data-slide-to="0"
                      :style="`background-image: url(${product.pictureUrl.url});`"
                    ></li>
                  </ol>
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="d-block w-100" :src="product.pictureUrl.url" :alt="product.pictureUrl.url" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-5">
              <div class="single_product_desc">
                <!-- Product Meta Data -->
                <div class="product-meta-data">
                  <div class="line"></div>
                  <p class="product-price">${{ this.product.price }}</p>
                  <router-link to>
                    <h6>{{ this.product.name }}</h6>
                  </router-link>
                  <!-- Ratings & Review -->
                  <div
                    class="ratings-review mb-15 d-flex align-items-center justify-content-between"
                  >
                    <div class="ratings">
                      <i class="fa fa-star" aria-hidden="true" v-for="item in 5" :key="item"></i>
                    </div>
                  </div>
                  <!-- Avaiable -->
                  <p class="avaibility">
                    <i class="fa fa-circle" :style="{ color: changeColorToStock }"></i>
                    In Stock( {{ this.product.stock }} )
                  </p>
                </div>

                <div class="short_overview my-5">
                  <p>{{ this.product.description }}</p>
                </div>

                <!-- Add to Cart Form -->
                <div class="cart clearfix">
                  <div class="cart-btn d-flex mb-50">
                    <p>Qty</p>
                    <div class="quantity">
                      <span class="qty-minus" @click="changeValueToQuantity(-1)">
                        <i class="fa fa-caret-down" aria-hidden="true"></i>
                      </span>
                      <input
                        type="number"
                        class="qty-text"
                        id="qty"
                        step="1"
                        name="quantity"
                        v-model="quantity"
                      />
                      <span class="qty-plus" @click="changeValueToQuantity(1)">
                        <i class="fa fa-caret-up" aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>
                  <b-button
                    class="btn amado-btn"
                    v-b-tooltip.hover.left
                    :title="'Add to cart'"
                    :variant="'outline-success'"
                    :disabled="quantity === 0"
                    @click="addToCart({product, quantity})"
                  >
                    <h4>Add to Cart</h4>
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Product Details Area End -->
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import { mapActions } from "vuex";
export default {
  name: "Principal",
  props: {
    productId: String
  },
  components: {
    Menu
  },
  data() {
    return {
      quantity: 0,
      product: {
        name: "",
        stock: 0,
        price: 0,
        category: {},
        pictureUrl: {}
      }
    };
  },
  created() {
    this.axios
      .post(
        "/product/one",
        { filter: { _id: this.productId } },
        { headers: this.$store.state.headers }
      )
      .then(res => (this.product = res.data))
      .catch(e => {
        if (e.response.status === 401) this.$router.push("/authenticate");
      });
  },
  methods: {
    changeValueToQuantity(val) {
      if (
        (val == 1 && this.product.stock == 0) ||
        (val == -1 && this.quantity == 0)
      )
        return;

      this.quantity += val;
      this.product.stock += -val;
    },
    ...mapActions(["addToCart"])
  },
  computed: {
    changeColorToStock() {
      if (this.product.stock <= 2) return "red";
      return "#20d34a";
    }
  }
};
</script>