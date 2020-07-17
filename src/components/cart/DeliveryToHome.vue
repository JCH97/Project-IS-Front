<template>
  <div>
    <div>
      <b-form-checkbox
        id="checkbox-1"
        v-model="status"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
      >Check for delivery to home</b-form-checkbox>
    </div>
    <b-form-select
      class="mt-5"
      v-if="status === 'accepted'"
      v-model="selected"
      :options="options"
      @change="changeSelected"
    >
      <!-- This slot appears above the options from 'options' prop -->
      <template v-slot:first>
        <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
      </template>
    </b-form-select>
  </div>
</template>

<script>
export default {
  name: "DeliveryToHome",
  data() {
    return {
      status: "not_accepted",
      selected: null,
      options: [
        { value: { Lisa: 3 }, text: "Lisa" },
        { value: { "Habana Vieja": 2 }, text: "Habana Vieja" },
        { value: { "Centro Habana": 5 }, text: "Centro Habana" },
        { value: { Marianao: 2 }, text: "Marianao" },
        { value: { Boyeros: 5 }, text: "Boyeros" },
        { value: { "Habana del Este": 5 }, text: "Habana del Este" },
        { value: { Alamar: 7 }, text: "Alamar" },
        { value: { Miramar: 3 }, text: "Miramar" },
        { value: { Playa: 1 }, text: "Playa" },
        { value: { "10 de Octubre": 8 }, text: "10 de Octubre" },
        { value: { "San Agustin": 10 }, text: "San Agustin" },
        { value: { Cotorro: 10 }, text: "Cotorro" },
        { value: { Cotorro: 9 }, text: "Guanabacoa" }
      ]
    };
  },
  methods: {
    changeSelected() {
      this.$emit("destinyToDelivery", this.selected);
    }
  },
  watch: {
    status: function(newStatus) {
      if (newStatus === "not_accepted") {
        this.$emit("destinyToDelivery", { notYet: 0 });
        this.selected = null;
      }
    }
  }
};
</script>