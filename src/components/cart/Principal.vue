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
                    <tr v-for="(item) in cartUserLog" :key="item.product._id">
                      <td class="cart_product_img">
                        <img :src="item.product.pictureUrl" alt="Photo" />
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
                            <p>
                              {{ item.quantity }}
                              <router-link to>
                                <b-icon-trash-fill
                                  class="ml-2"
                                  variant="danger"
                                  @click="deleteProdCart(item)"
                                ></b-icon-trash-fill>
                              </router-link>
                            </p>
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
                  <!-- <a href="cart.html" class="btn amado-btn w-100">Checkout</a> -->
                  <b-button variant="outline-warning" class="btn amado-btn w-100">
                    <h4>CHECKOUT</h4>
                  </b-button>
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
import { mapActions } from "vuex";
export default {
  name: "Principal",
  components: {
    Menu
  },
  data() {
    return {
      cartUserLog: []
    };
  },
  mounted() {
    this.cartUserLog = JSON.parse(
      localStorage.getItem("cartUserLog") || JSON.stringify([])
    );
  },
  methods: {
    calcCost() {
      let totalPrice = parseFloat(0);
      this.cartUserLog.forEach(e => {
        totalPrice += parseFloat(e.product.price) * parseFloat(e.quantity);
      });

      return totalPrice + this.getCostToDelivery();
    },
    getCostToDelivery() {
      return 0;
    },
    deleteProdCart(toDelete) {
      //toDelete: { product: Object, quantity: Number }
      let obj = this.cartUserLog.find(
        e => e.product._id === toDelete.product._id
      );
      let indx = this.cartUserLog.indexOf(obj);

      if (this.cartUserLog[indx].quantity === 1)
        this.cartUserLog.splice(obj, 1);
      else this.cartUserLog[indx].quantity -= 1;

      localStorage.setItem("cartUserLog", JSON.stringify(this.cartUserLog));

      this.setLength();
    },
    ...mapActions(["setLength"])
  }
};
</script>