<template>
  <div>
    <div class="main-content-wrapper d-flex clearfix">
      <Menu />
      <div class="cart-table-area section-padding-100">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 col-lg-8">
              <div class="cart-title mt-50">
                <h2>Shopping Cart</h2>
              </div>

              <div class="cart-table clearfix">
                <table class="table table-responsive">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item) in user.cart" :key="item.product._id">
                      <td class="cart_product_img">
                        <img :src="item.product.pictureUrl" alt="Product" />
                      </td>
                      <td class="cart_product_desc">
                        <h5>{{ item.product.name }}</h5>
                      </td>
                      <td class="price">
                        <span>${{ item.product.price }}</span>
                      </td>
                      <td class="qty">
                        <div class="qty-btn d-flex">
                          <p>Qty</p>
                          <div class="quantity">
                            <p>{{ item.quantity }}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-12 col-lg-4">
              <div class="cart-summary">
                <h5>Cart Total</h5>
                <ul class="summary-table">
                  <li>
                    <span>subtotal:</span>
                    <span>${{ this.calcCost() - this.getCostToDelivery() }}</span>
                  </li>
                  <li>
                    <span>delivery:</span>
                    <span>{{ this.getCostToDelivery() }}</span>
                  </li>
                  <li>
                    <span>total:</span>
                    <span>${{ this.calcCost() }}</span>
                  </li>
                </ul>
                <div class="cart-btn mt-100">
                  <a href="cart.html" class="btn amado-btn w-100">Checkout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import { mapState } from "vuex";
export default {
  name: "Principal",
  components: {
    Menu
  },
  methods: {
    calcCost() {
      let totalPrice = 0;
      this.user.cart.forEach(e => {
        totalPrice += e.product.price * e.quantity;
      });

      return totalPrice + this.getCostToDelivery();
    },
    getCostToDelivery() {}
  },
  computed: {
    ...mapState(["user", "tokens"])
  }
};
</script>