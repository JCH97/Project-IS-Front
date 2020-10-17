<template>
  <div>
    <b-modal
      ref="modalDataAuction"
      id="modalDataAuction"
      size="md"
      title="Data auction"
      ok-only
      hide-footer
    >
      <b-form-text id="name-help">Add init price.</b-form-text>
      <b-form-input
        class="mb-4"
        type="number"
        name="price"
        id="price"
        placeholder="Init price"
        :state="price > 0"
        v-model="price"
      />
      <b-form-text id="name-help">Add duration (in hours).</b-form-text>
      <b-form-input
        class="mb-4"
        type="number"
        name="duration"
        id="duration"
        placeholder="Duration in hours"
        :state="duration > 0"
        v-model="duration"
      />

      <b-button @click="setData" variant="success" block class="mt-3"
        >Make auction</b-button
      >
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "ModalCreateAuction",
  data() {
    return {
      price: 0,
      duration: 0
    };
  },
  methods: {
    setData: function() {
      this.$refs["modalDataAuction"].hide();
      this.$emit("dataAuction", { price: this.price, duration: this.duration });
    }
  }
};
</script>