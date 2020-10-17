<template>
  <div>
    <b-modal
      ref="modalPay"
      id="modalPay"
      size="md"
      title="Credit card details"
      ok-only
      hide-footer
    >
      <b-form-text id="name-help">Add card number.</b-form-text>
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon icon="credit-card"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          name="card"
          id="card"
          placeholder="Card Number"
          aria-describedby="name-help name-invalid"
          v-model="cardNumber"
          :state="cardNumber > 0"
          required
        >
        </b-form-input>
      </b-input-group>

      <b-button variant="outline-success" block @click="make">Buy</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "PayMethod",
  data() {
    return {
      cardNumber: 0
    };
  },
  methods: {
    make: function() {
      this.$refs['modalPay'].hide();
      this.$emit("makeBuy", { creadirCard: this.cardNumber });
    }
  }
};
</script>