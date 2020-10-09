<template>
  <div>
    <UploadImage @saveImage="saveImage" />
    <b-modal id="modalBase" ref="modalBase" :title="params.title" ok-only hide-footer>
      <b-form-group v-if="params.data">
        <b-form-text id="name-help">Add name.</b-form-text>
        <b-form-input
          class="mb-4"
          name="name"
          id="name"
          placeholder="Name"
          aria-describedby="name-help name-invalid"
          :state="params.data.name.length > 2"
          v-model="params.data.name"
        ></b-form-input>

        <b-form-text id="price-help">Add cost.</b-form-text>
        <b-form-input
          type="number"
          class="mb-4"
          name="price"
          id="price"
          aria-describedby="price-help"
          :state="params.data.price > 0"
          v-model="params.data.price"
        ></b-form-input>

        <b-form-text id="stocks-help">Add stock.</b-form-text>
        <b-form-input
          type="number"
          class="mb-4"
          name="stock"
          id="stock"
          aria-describedby="stock-help"
          :state="params.data.stock > 0"
          v-model="params.data.stock"
        ></b-form-input>

        <b-form-text id="description-help">Add description.</b-form-text>
        <b-form-textarea
          class="mb-4"
          name="description"
          id="description"
          v-model="params.data.description"
          aria-describedby="description-help"
          no-resize
          placeholder="Description"
        ></b-form-textarea>

        <b-button
          class="mb-4"
          variant="outline-warning"
          v-b-modal.modalAddPhoto
          block
          size="sm"
        >Agregar foto</b-button>

        <b-button
          variant="outline-success"
          block
          @click="saveProduct()"
        >{{ this.params.textButton }}</b-button>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import UploadImage from "@/components/shop/UploadImage.vue";
import { mapState } from "vuex";
export default {
  name: "ModalBase",
  components: {
    UploadImage
  },
  props: {
    params: Object //{ title, textButton, url, isCreate, data, car }
  },
  methods: {
    ok(ans) {
      this.$emit("partsChange", ans);
    },
    fail(msj) {
      this.flashMessage.error({
        title: "Error!!!!",
        message: msj
      });
    },
    pre() {
      this.$refs["modalBase"].hide();
    },
    saveProduct() {
      this.pre();
      if (this.params.isCreate)
        this.axios
          .post(
            "/product",
            { data: this.params.data },
            { headers: this.$store.state.headers }
          )
          .then(res => {
            this.ok(res.data);

            this.flashMessage.success({
              title: "Product added",
              message: `${this.params.data.name} added successfully!!`
            });
          })
          .catch(err => {
            if (err.response.data.statusCode === 401)
              this.$router.push("/authenticate");
            this.fail(err.response.data.error || "Error to save");
          });
      else {
        this.axios
          .put(
            "/product",
            { updt: this.params.data, filter: { _id: this.params.data._id } },
            { headers: this.headers }
          )
          .then(res => {
            this.ok(res.data);

            this.flashMessage.success({
              title: "Product edited",
              message: `${this.params.data.name} edited successfully!!`
            });
          })
          .catch(err => {
            if (err.response.data.statusCode === 401)
              this.$router.push("/authenticate");
            this.fail(err.response.data.error || "Error to save");
          });
      }
    },
    saveImage(val) {
      this.params.data.pictureUrl = val;
    }
  },
  computed: {
    ...mapState(["headers"])
  }
};
</script>