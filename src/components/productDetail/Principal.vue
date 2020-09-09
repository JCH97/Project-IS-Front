<template>
  <div>
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
                    <router-link to>{{ this.product.car.model.split('@')[0] }}</router-link>
                  </li>
                  <li class="breadcrumb-item">
                    <router-link to>{{ this.product.car.model.split('@')[1] }}</router-link>
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
                      :style="`background-image: url(${product.pictureUrl});`"
                    ></li>
                  </ol>
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="d-block w-100" :src="product.pictureUrl" alt="First slide" />
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
                        min="1"
                        :max="product.stock"
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
                    :title="product.stock === 0 ? 'Stock empty, contact with admin' : 'Add to cart'"
                    :variant="product.stock === 0 ? 'outline-danger': 'outline-warning'"
                    :disabled="product.stock === 0"
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
    product: Object
  },
  components: {
    Menu
  },
  data() {
    return {
      quantity: 1
    };
  },
  methods: {
    changeValueToQuantity(val) {
      this.quantity += val;
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