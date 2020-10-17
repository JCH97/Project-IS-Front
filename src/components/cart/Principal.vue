<template>
  <div>
    <FlashMessage :position="'right top'"></FlashMessage>
    <div class="main-content-wrapper d-flex clearfix">
      <Menu />
      <PayMethod @makeBuy="buy" />
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
                    <tr
                      v-for="key_pair in Object.keys(cart)"
                      :key="cart[key_pair][1]._id"
                    >
                      <td class="cart_product_img">
                        <img
                          :src="cart[key_pair][1].pictureUrl.url"
                          alt="Photo"
                        />
                      </td>
                      <td class="cart_product_desc">
                        <h5>{{ cart[key_pair][1].name }}</h5>
                      </td>
                      <td class="price">
                        <span>${{ cart[key_pair][1].price }}</span>
                      </td>
                      <td class="qty">
                        <div class="qty-btn d-flex">
                          <p>Qty</p>
                          <div class="quantity">
                            <p>
                              {{ cart[key_pair][0] }}
                              <router-link to>
                                <b-icon-trash-fill
                                  class="ml-2"
                                  variant="danger"
                                  @click="deleteProdCart(key_pair)"
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
                    <span>${{ this.totalCost }}</span>
                  </li>
                  <li>
                    <span>delivery:</span>
                    <span>{{ this.costToDelivery }}</span>
                  </li>
                  <li>
                    <span>total:</span>
                    <span>${{ this.totalCost + this.costToDelivery }}</span>
                  </li>
                  <li>
                    <span>with discount:</span>
                    <span>${{ this.withDiscount + this.costToDelivery }}</span>
                  </li>
                </ul>
                <div class="cart-btn mt-100">
                  <!-- <a href="cart.html" class="btn amado-btn w-100">Checkout</a> -->
                  <b-button
                    variant="outline-warning"
                    class="btn amado-btn w-100"
                    v-b-modal.modalPay
                  >
                    <h4>CHECKOUT</h4>
                  </b-button>
                </div>
              </div>
            </div>
          </div>
          <DeliveryToHome @destinyToDelivery="setCostToDelivery" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import DeliveryToHome from "@/components/cart/DeliveryToHome.vue";
import PayMethod from "@/components/cart/PayMethod.vue";
export default {
  name: "Principal",
  components: {
    Menu,
    DeliveryToHome,
    PayMethod
  },
  data() {
    return {
      cart: {}, //format => { idProduct1: [amount: number, product1: Product] , idProduct: [amount, product2], ... }
      costToDelivery: 0,
      withDiscount: 0,
      totalCost: 0
    };
  },
  mounted() {
    this.axios
      .get("/cart/groupBy", { headers: this.$store.state.headers })
      .then(res => {
        this.cart = res.data;

        this.costWithDiscount();
      })
      .catch(e => {
        if (e.response.status === 401) this.$router.push("/authenticate");
      });
  },

  methods: {
    calcCost: function() {
      let totalPrice = parseFloat(0);
      Object.keys(this.cart).forEach(e => {
        let val = this.cart[e]; // val's format => [amount: number, product: Product]
        totalPrice += val[0] * val[1].price;
      });

      this.totalCost = totalPrice;
    },

    setCostToDelivery: function(value) {
      //console.log(`from cart principal ${Object.keys(value)[0]}`);
      this.costToDelivery = value[Object.keys(value)[0]];
    },

    deleteProdCart: function(idProduct) {
      let val = this.cart[idProduct]; // val's format => [amount: number, product: Product]

      if (val[0] === 1) {
        //remove product
        delete this.cart[idProduct];
      } else {
        //substract 1 in amount
        val[0] -= 1;
      }

      this.axios
        .put(
          "/cart",
          {
            filter: { $and: [{ product: idProduct }, { status: "IN_CART" }] },
            updt: { status: "RESTORE_SHOP" }
          },
          { headers: this.$store.state.headers }
        )
        .then(() => {
          this.flashMessage.success({
            title: "Product removed",
            message: "Product removed from cart successfully!!"
          });
        })
        .catch(err => {
          if (err.response.status === 401) this.$router.push("/authenticate");
        });

      this.$store.dispatch("setLengthCart");
      this.costWithDiscount();
    },

    costWithDiscount: function() {
      this.calcCost();

      this.axios
        .get("/user/me", { headers: this.$store.state.headers })
        .then(res => {
          let disc = res.data.discount;

          this.withDiscount = this.totalCost - this.totalCost * (disc / 100);
        });
    },

    buy: function(creditCard) {
      this.axios
        .post(
          "/cart/buy",
          { cost: this.withDiscount + this.costToDelivery, creditCard },
          {
            headers: this.$store.state.headers
          }
        )
        .then(res => {
          if (res.data.env)
            this.flashMessage.success({
              title: "Mail",
              message: "Development mode, not send mail; but all works ok!!!"
            });
          else
            this.flashMessage.success({
              title: "Mail",
              message: "Send mail successfully!!!"
            });

          this.$router.push("/");
        })
        .catch(err => {
          if (err.response.status === 401) this.$router.push("/authenticate");

          this.flashMessage.error({
            title: "Error!!!!",
            message: err.response.data
          });
        });
    }
  }
};
</script>