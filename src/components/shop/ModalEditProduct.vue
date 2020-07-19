<template>
  <div>
    <!-- <b-button v-b-modal.modalEditProduct>Open First Modal</b-button> -->
    <b-modal id="modalEditProduct" ref="modalEditProduct" title="Edit product" ok-only hide-footer>
      <b-form-group>
        <b-form-text id="name-help">Ingrese el nombre del producto.</b-form-text>
        <b-form-input
          class="mb-4"
          :state="toEdit.name.length > 2"
          name="name"
          id="name"
          placeholder="Nombre"
          aria-describedby="name-help name-invalid"
          v-model="toEdit.name"
        ></b-form-input>

        <b-form-text id="serialNumber-help">Ingrese el numero de serie del producto</b-form-text>
        <b-form-input
          class="mb-4"
          name="serialNumber"
          id="serialNumber"
          aria-describedby="serialNumber-help"
          placeholder="Numero de serie"
          v-model="toEdit.serialNumber"
        ></b-form-input>

        <b-form-text id="price-help">Ingrese el precio del producto</b-form-text>
        <b-form-input
          type="number"
          class="mb-4"
          name="price"
          id="price"
          aria-describedby="price-help"
          :state="toEdit.price > 0"
          v-model="toEdit.price"
        ></b-form-input>

        <b-form-text id="dim-help">Ingrese las dimensiones del producto</b-form-text>
        <b-form-input
          type="text"
          class="mb-4"
          name="dim"
          id="dim"
          aria-describedby="dim-help"
          v-model="toEdit.dim"
        ></b-form-input>

        <b-form-text id="stock-help">Ingrese el stock del producto</b-form-text>
        <b-form-input
          type="number"
          class="mb-4"
          name="stock"
          id="stock"
          aria-describedby="stock-help"
          :state="toEdit.stock > 0"
          v-model="toEdit.stock"
        ></b-form-input>

        <b-form-text id="description-help">Ingrese la descripcion del producto</b-form-text>
        <b-form-textarea
          class="mb-4"
          name="description"
          id="description"
          v-model="toEdit.description"
          aria-describedby="description-help"
          no-resize
        ></b-form-textarea>

        <b-button
          class="mb-4"
          variant="outline-warning"
          v-b-modal.modalAddPhoto
          block
          size="sm"
        >Agregar foto</b-button>

        <b-button variant="outline-success" block @click="saveProduct()">Guardar</b-button>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalEditProduct",
  props: {
    toEdit: Object,
    idCart: String
  },
  data() {
    return {
      file: ""
    };
  },
  methods: {
    saveProduct() {
      this.$refs["modalEditProduct"].hide();
      this.axios
        .put(`/api/protected/part/${this.toEdit._id}`, this.toEdit, {
          headers: {
            "x-access-token": localStorage.getItem(
              "accessToken" || JSON.stringify("")
            )
          }
        })
        .then(res => {
          this.$emit("productEdited", res.data);
        })
        .catch(err => {
          this.flashMessage.error({
            title: "Error!!!!",
            message: err.response.data.error
          });
        });
    },
    onSelect() {
      this.file = this.$refs.file.files[0];
    },
    saveImage() {
      this.$refs["modalPhoto"].hide();

      let fromData = new FormData();
      fromData.append("image", this.file);

      this.axios
        .post("/api/protected/part/uploadImage", fromData, {
          headers: {
            "x-access-token": localStorage.getItem(
              "accessToken" || JSON.stringify()
            )
          }
        })
        .then(res => {
          this.toEdit.pictureUrl = res.data.image;
        })
        .catch(err => {
          this.flashMessage.error({
            title: "Error!!!!",
            message: err.response.data.error
          });
        });
    }
  }
};
</script>