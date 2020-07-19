<template>
  <div>
    <!-- <b-button v-b-modal.modalCreateProduct>Open First Modal</b-button> -->
    <b-modal
      id="modalCreateProduct"
      ref="modalCreateProduct"
      title="Create product"
      ok-only
      hide-footer
    >
      <b-form-group>
        <b-form-text id="name-help">Ingrese el nombre del producto.</b-form-text>
        <b-form-input
          class="mb-4"
          :state="data.name.length > 2"
          name="name"
          id="name"
          placeholder="Nombre"
          aria-describedby="name-help name-invalid"
          v-model="data.name"
        ></b-form-input>

        <b-form-text id="serialNumber-help">Ingrese el numero de serie del producto</b-form-text>
        <b-form-input
          class="mb-4"
          name="serialNumber"
          id="serialNumber"
          aria-describedby="serialNumber-help"
          placeholder="Numero de serie"
          v-model="data.serialNumber"
        ></b-form-input>

        <b-form-text id="price-help">Ingrese el precio del producto</b-form-text>
        <b-form-input
          type="number"
          class="mb-4"
          name="price"
          id="price"
          aria-describedby="price-help"
          :state="data.price > 0"
          v-model="data.price"
        ></b-form-input>

        <b-form-text id="dim-help">Ingrese las dimensiones del producto</b-form-text>
        <b-form-input
          type="text"
          class="mb-4"
          name="dim"
          id="dim"
          aria-describedby="dim-help"
          v-model="data.dim"
        ></b-form-input>

        <b-form-text id="stocks-help">Ingrese el stock del producto</b-form-text>
        <b-form-input
          type="number"
          class="mb-4"
          name="stock"
          id="stock"
          aria-describedby="stock-help"
          :state="data.stock > 0"
          v-model="data.stock"
        ></b-form-input>

        <b-form-text id="description-help">Ingrese la descripcion del producto</b-form-text>
        <b-form-textarea
          class="mb-4"
          name="description"
          id="description"
          v-model="data.description"
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

    <b-modal ref="modalPhoto" id="modalAddPhoto" size="md" title="Agregar foto" ok-only hide-footer>
      <form @submit.prevent="saveImage()" enctype="multipart/form-data">
        <input
          class="mb-4"
          ref="file"
          type="file"
          name="image"
          accept="image/*"
          @change="onSelect()"
        />
        <b-button variant="outline-success" block @click="saveImage()">Guardar</b-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { join } from "path";
export default {
  name: "ModalCreateProduct",
  props: {
    idCar: String
  },
  data() {
    return {
      data: {
        name: "",
        serialNumber: "",
        dim: "",
        description: "",
        price: 0,
        stock: 0,
        pictureUrl: "",
        car: ""
      },
      file: ""
    };
  },
  methods: {
    saveProduct() {
      this.$refs["modalCreateProduct"].hide();
      this.data.car = this.idCar;
      if (!this.data.pictureUrl)
        this.data.pictureUrl = join("uploads", "parts", "notFound.jpg");
      this.axios
        .post("/api/part", this.data, {
          headers: {
            "x-access-token": localStorage.getItem(
              "accessToken" || JSON.stringify("")
            )
          }
        })
        .then(res => {
          this.$emit("addNewProduct", res.data);

          let keys = Object.keys(this.data);
          for (let i = 0; i < keys.length; i++) {
            this.data[keys[i]] =
              keys[i] === "price" || keys[i] === "stock" ? 0 : "";
          }
          this.file = "";
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
        .post("/api/part/uploadImage", fromData, {
          headers: {
            "x-access-token": localStorage.getItem(
              "accessToken" || JSON.stringify()
            )
          }
        })
        .then(res => {
          this.data.pictureUrl = res.data.image;
        })
        .catch(err => {
          this.flashMessage.error({
            title: "Error!!!!",
            message: err.response.data.error
          });
        });
    }
  },
  computed: {}
};
</script>