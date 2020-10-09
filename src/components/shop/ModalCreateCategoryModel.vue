<template>
  <div>
    <b-modal
      id="modalCreateCategoryModel"
      ref="modalCreateCategoryModel"
      title="Add category"
      ok-only
      hide-footer
    >
      <b-form-text id="name-help">Add name of category</b-form-text>
      <b-form-input
        class="mb-4"
        :state="name.length > 2"
        name="name"
        id="name"
        placeholder="Name"
        aria-describedby="name-help name-invalid"
        v-model="name"
      ></b-form-input>

      <!-- <label for="tags-basic">Introduzca los modelos.</label>
      <b-form-tags input-id="tags-basic" v-model="value" class="mb-4"></b-form-tags>-->

      <b-button variant="outline-success" block @click="save()">Save</b-button>
    </b-modal>
  </div>
</template>


<script>
export default {
  name: "ModalCreateCategoryModel",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    save: function() {
      this.$refs["modalCreateCategoryModel"].hide();

      this.axios
        .post(
          "/category",
          { data: { name: this.name } },
          { headers: this.$store.state.headers }
        )
        .then(data => {
          this.$emit("newCategory", data.data);
          this.name = "";

          this.flashMessage.success({
            title: "Category added",
            message: "Category added successfully!!!"
          });
        })
        .catch(err => {
          if (err.response.data.status === 401)
            this.$router.push("/authenticate");

          this.flashMessage.error({
            title: "Error!!!!",
            message: err.response.data.error
          });
        });
    }
  }
};
</script>