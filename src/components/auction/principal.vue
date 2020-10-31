<template>
  <div>
    <FlashMessage :position="'right top'"></FlashMessage>
    <div class="main-content-wrapper d-flex clearfix">
      <Menu />
      <div class="single-product-area section-padding-100 clearfix">
        <div class="container-fluid">
          <b-alert v-if="this.auctionDetails.product && this.auctionDetails.user"
            :show="timeToShowAuctionFinishedInSec"
            dismissible
            variant="success"
            @dismissed="timeToShowAuctionFinishedInSec = 0"
          >
            Well!!!! Auction for {{ this.auctionDetails.product.name }} has finished.
            Winner: {{ this.auctionDetails.user.email }}
            Finish price: {{ this.auctionDetails.actualPrice }}
          </b-alert>
          <div class="row">
            <div class="col-12 col-lg-6 col-md-6">
              <ol>
                <h3 class="w3-center">Products for auctions</h3>
                <li v-for="(item, index) in auctions" :key="index">
                  <router-link to>
                    <h3
                      class="w3-center w3-padding-16"
                      @click="details(item._id)"
                    >
                      {{ item.product.name }}
                    </h3>
                  </router-link>
                </li>
              </ol>
            </div>
            <div class="col-12 col-lg-6 col-md-6">
              <ol>
                <li
                  v-if="auctionDetails.product"
                  class="w3-center w3-padding-16"
                >
                  <img
                    :src="auctionDetails.product.pictureUrl.url"
                    class="w3-circle"
                    alt="Foto del producto"
                  />
                </li>
                <li
                  v-if="auctionDetails.initPrice"
                  class="w3-center w3-padding-16"
                >
                  <h3>Init Price: {{ this.auctionDetails.initPrice }}</h3>
                </li>
                <li
                  v-if="auctionDetails.product"
                  class="w3-center w3-padding-16"
                >
                  <h3>
                    Product's name: {{ this.auctionDetails.product.name }}
                  </h3>
                </li>
                <li
                  v-if="auctionDetails.actualPrice"
                  class="w3-center w3-padding-16"
                >
                  <h3>Actual price: {{ this.auctionDetails.actualPrice }}</h3>
                </li>
                <li v-if="auctionDetails.user" class="w3-center w3-padding-16">
                  <h3>Actual winner: {{ this.auctionDetails.user.email }}</h3>
                </li>
                <li
                  v-if="auctionDetails.product"
                  class="w3-center w3-padding-16"
                >
                  <flip-countdown
                    :deadline="end"
                    @timeElapsed="endTimer"
                  ></flip-countdown>
                </li>
                <li v-if="auctionDetails.product">
                  <div class="w3-row w3-row-padding">
                    <div class="w3-col m6 s12">
                      <b-button
                        :variant="bidUp > 0 ? 'success' : 'danger'"
                        block
                        :disabled="bidUp <= 0"
                        @click="makebidUp"
                        >BidUp</b-button
                      >
                    </div>
                    <div class="w3-col m6 s12">
                      <b-form-input
                        type="number"
                        placeholder="value"
                        v-model="bidUp"
                      >
                      </b-form-input>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlipCountdown from "vue2-flip-countdown";
import Menu from "@/components/Menu.vue";
import moment from "moment";

const fmt = "YYYY-MM-DD HH:mm:ss";

export default {
  name: "Principal",
  components: {
    Menu,
    FlipCountdown
  },
  data() {
    return {
      auctions: [],
      auctionDetails: {},
      end: moment()
        .add(10, "s")
        .format(fmt),
      bidUp: 0,
      timeToShowAuctionFinishedInSec: 0
    };
  },
  created() {
    this.axios
      .get("/auction/all", { headers: this.$store.state.headers })
      .then(res => {
        this.auctions = res.data;
      })
      .catch(e => {
        if (e.response.status === 401) this.$router.push("/authenticate");
      });
  },
  methods: {
    details: function(auctionId) {
      this.auctionDetails = this.auctions.find(a => a._id === auctionId);
      let timeRunning = moment
        .duration(moment().diff(moment(this.auctionDetails.createdAt)))
        .asSeconds();
      //tiempo que lleva la subasta corriendo dataNow - createdAt

      let durationInSec = this.auctionDetails.duration * 3600; //lo que dura la subasta en segundos
      if (timeRunning > durationInSec) {
        this.auctionDetails.finished = true;
        return;
      }

      this.end = moment()
        .add(durationInSec - timeRunning, "s")
        .format(fmt);
    },
    endTimer: function() {
      this.timeToShowAuctionFinishedInSec = 5;
    },
    countDownChange: function() {

    },
    makebidUp: function() {
      this.axios
        .post(
          "/auction/bidUp",
          { amount: parseInt(this.bidUp), idAuction: this.auctionDetails._id },
          { headers: this.$store.state.headers }
        )
        .then(res => {
          this.auctionDetails = res.data;
        })
        .catch(e => {
          if (e.response.status === 401) this.$router.push("/authenticate");
        });
    }
  }
};
</script>