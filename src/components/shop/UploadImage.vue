<template>
  <div>
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
      </form>

      <b-button @click="saveImage" v-if="file" variant="success" block class="mt-3">Guardar</b-button>
    </b-modal>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "UploadImage",
  data() {
    return {
      file: ""
    };
  },
  methods: {
    onSelect() {
      this.file = this.$refs.file.files[0];
    },
    saveImage() {
      this.$refs["modalPhoto"].hide();

      let fromData = new FormData();
      fromData.append("image", this.file);

      this.axios
        .post("/api/protected/admin/part/uploadImage", fromData, {
          headers: this.headers
        })
        .then(res => {
          this.$emit("saveImage", res.data.image);

          this.flashMessage.success({
            title: "Image",
            message: "Image save successfully!!!"
          });
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