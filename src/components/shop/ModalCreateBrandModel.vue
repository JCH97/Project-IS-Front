<template>
  <div>
    <b-modal
      id="modalCreateBrandModel"
      ref="modalCreateBrandModel"
      title="Add Brand and Models"
      ok-only
      hide-footer
    >
      <b-form-text
        id="name-help"
      >Ingrese la marca [Si la marca ya exite pongala exactamente como aparece en la lista].</b-form-text>
      <b-form-input
        class="mb-4"
        :state="name.length > 2"
        name="name"
        id="name"
        placeholder="Nombre"
        aria-describedby="name-help name-invalid"
        v-model="name"
      ></b-form-input>

      <label for="tags-basic">Introduzca los modelos.</label>
      <b-form-tags input-id="tags-basic" v-model="value" class="mb-4"></b-form-tags>

      <b-button variant="outline-success" block @click="save()">Guardar</b-button>
    </b-modal>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "ModalCreateBrand-Model",
  data() {
    return {
      name: "",
      value: []
    };
  },
  methods: {
    save() {
      this.$refs["modalCreateBrandModel"].hide();

      this.axios
        .post(
          "/api/protected/admin/car",
          { brand: this.name, models: this.value },
          { headers: this.headers }
        )
        .then(() => {
          this.$emit("newBrandModels", this.name);
          this.name = "";
          this.value = [];
        })
        .catch(err => {
          if (err.response.data.statusCode === 401)
            this.$router.push("/authenticate");

          this.flashMessage.error({
            title: "Error!!!!",
            message: err.response.data.error
          });
        });
    }
  },
  computed: {
    ...mapState(["headers"])
  }
};
</script>