<template>
  <div>
    <FlashMessage :position="'right top'"></FlashMessage>
    <ModalBase :params="paramsModal" @partsChange="partsChange" />
    <ModalCreateCategoryModel @newCategory="newCategory" />
    <div class="main-content-wrapper d-flex clearfix">
      <Menu />
      <div class="shop_sidebar_area">
        <!-- ##### Single Widget ##### -->
        <div class="widget catagory mb-50">
          <!-- Widget Title -->
          <h6 class="widget-title mb-30">
            Categories
            <router-link to>
              <b-icon-plus
                class="h1 mb-2"
                v-b-modal.modalCreateCategoryModel
                v-b-tooltip.hover.right
                title="Add new category"
                v-if="isAdmin"
              ></b-icon-plus>
            </router-link>
          </h6>

          <!--  Catagories  -->
          <div class="catagories-menu">
            <ul>
              <li v-for="item in categories" :key="item._id" :id="item.name">
                <b-icon-trash v-if="isAdmin" variant="danger" @click="confirmToDelete(item._id)"></b-icon-trash>
                <span @click="changeClassInCategoryList(item)">
                  <router-link to>{{ item.name }}</router-link>
                </span>
              </li>
            </ul>
          </div>
          <hr />
          <!-- <div v-if="this.selectedBrandModel.brand">
            <h6 class="widget-title mb-30">Listado de modelos:</h6>
            <div class="catagories-menu">
              <ol>
                <li v-for="item in Object.keys(modelsOfBrand)" :key="item" :id="`m${item}`">
                  <b-icon-trash
                    v-if="isAdmin"
                    variant="danger"
                    @click="confirmToDelete(item, false)"
                  ></b-icon-trash>
                  <span @click="changeClassInModelList(item)">
                    <router-link to>{{ item }}</router-link>
                  </span>
                </li>
              </ol>
            </div>
          </div>-->
        </div>
      </div>

      <div class="amado_product_area section-padding-100">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="product-topbar d-xl-flex align-items-end justify-content-between">
                <!-- Total Products -->
                <div class="total-products">
                  <p class="h1">
                    <!-- Show {{ this.perPage * (this.page - 1) + 1 }} - {{ this.page * this.perPage }} of {{ this.numberOfPages }} pages [ ] -->
                    <router-link to v-if="isAdmin && selectedCategory">
                      <b-icon-gear-wide-connected
                        @click="addNewProduct"
                        v-b-tooltip.hover.right
                        title="Add new product"
                        class="h5 mb-1"
                        variant="danger"
                      ></b-icon-gear-wide-connected>
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Single Product Area -->
            <div class="col-12 col-sm-6 col-md-12 col-xl-6" v-for="item in parts" :key="item._id">
              <div class="single-product-wrapper">
                <!-- Product Image -->
                <div class="product-img">
                  <img class="w3-animate-zoom" :src="item.pictureUrl" alt />
                  <!-- Hover Thumb -->
                  <img class="hover-img" :src="item.pictureUrl" alt />
                </div>

                <!-- Product Description -->
                <div class="product-description d-flex align-items-center justify-content-between">
                  <!-- Product Meta Data -->
                  <div class="product-meta-data">
                    <div class="line"></div>
                    <p class="product-price">${{ item.price }}</p>
                    <router-link :to="{ name: 'ProductDetail', params: { obj: item} }">
                      <h6>{{ item.name }}</h6>
                    </router-link>
                  </div>
                  <!-- Ratings & Cart -->
                  <div class="ratings-cart text-right">
                    <div class="ratings">
                      <b-form-rating variant="warning" size="sm" inline show clear></b-form-rating>
                    </div>
                    <div class="cart">
                      <router-link
                        to
                        v-b-tooltip.hover.left
                        t
                        :title="item.stock === 0 ? 'Stock empty, contact with admin' : 'Add to cart'"
                      >
                        <img
                          src="img/core-img/cart.png"
                          @click="addToCart({product: item, quantity:1})"
                          :disabled="item.stock === 0"
                          :variant="item.stock === 0 ? 'outline-danger': ''"
                          alt="Image"
                        />
                      </router-link>
                    </div>
                    <router-link to v-if="isAdmin && selectedCategory">
                      <b-icon-pencil
                        @click="editProduct(item)"
                        v-b-tooltip.hover.left
                        class="h5"
                        title="Edit product"
                        variant="success"
                      ></b-icon-pencil>
                      <b-icon-trash
                        @click="removeProduct(item._id)"
                        v-b-tooltip.hover.right
                        class="h5"
                        title="Remove product"
                        variant="danger"
                      ></b-icon-trash>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <!-- Pagination -->
              <nav aria-label="navigation">
                <ul class="pagination justify-content-end mt-50">
                  <li
                    class="page-item"
                    v-for="(item) in numberOfPages"
                    :key="item"
                    :id="`n${item}`"
                    @click="changeNumberPage(item)"
                    :class="{'active': (item === 1)}"
                  >
                    <a class="page-link">{{ item }}.</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import ModalCreateCategoryModel from "@/components/shop/ModalCreateCategoryModel.vue";
import ModalBase from "@/components/shop/ModalBase.vue";
import { mapActions, mapState } from "vuex";
import { join } from "path";
export default {
  name: "Principal",
  components: {
    Menu,
    ModalBase,
    ModalCreateCategoryModel
  },
  props: {
    isAdmin: Boolean
  },
  data() {
    return {
      categories: [], //all data of categories { _id: ?, name: ? }
      selectedCategory: undefined, // look like this => { name: "", _id: "" },
      parts: [], //window of product
      page: 1,
      perPage: 6,
      numberOfPages: 0,
      paramsModal: {
        title: "",
        textButton: "",
        url: "",
        isCreate: true,
        data: undefined
      }
    };
  },
  mounted() {
    //select categories' list
    this.axios
      .get("/api/category", { headers: this.headers })
      .then(data => {
        this.categories = data.data;
        this.changeClassInCategoryList(data.data[0], true);
      })
      .catch(err => {
        console.log(err);
        this.flashMessage.error({
          title: "Error!!!!",
          message:
            err.response.data.error ||
            "Error to get data from the server, refresh page plase"
        });
      });
  },
  methods: {
    changeClassInCategoryList(category, forCreate = false) {
      //format of Category { name: ?, _id: ? }
      if (!forCreate) {
        //select the element with active clase for remove later
        let d = document.querySelector("li.active");
        if (d) d.classList.remove("active");

        //fill new active class
        document.querySelector(`#${category.name}`).classList.add("active");
      }

      this.selectedCategory = category;
      this.getNewPageToProduct();
    },

    getNewPageToProduct() {
      const data = {
        id: this.selectedCategory._id,
        perPage: this.perPage,
        page: this.page
      };

      this.axios
        .post("/api/product/perPage", data, { headers: this.headers })
        .then(data => {
          this.parts = data.data.products;
          this.numberOfPages = Math.ceil(
            parseFloat(data.data.count) / parseFloat(this.perPage)
          );
        })
        .catch(err => {
          this.flashMessage.error({
            title: "Error!!!!",
            message:
              err.response.data.error ||
              "Error to get data from the server, refresh page plase"
          });
        });
    },

    changeNumberPage(newNumber) {
      this.page = newNumber;
      this.getNewPageToProduct();

      let list = document.querySelectorAll("li.page-item");
      for (let i = 0; i < list.length; i++)
        if (list[i].classList.contains("active")) {
          list[i].classList.remove("active");
          break;
        }

      document.querySelector(`#n${newNumber}`).classList.add("active");
    },

    newCategory(category) {
      this.categories.push(category);
    },

    confirmToDelete(idCategory) {
      this.$bvModal
        .msgBoxConfirm("Are you sure?", {
          title: "Confirm delete",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Yes",
          cancelTitle: "No",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.axios
              .delete(`/api/protected/admin/category/${idCategory}`, {
                headers: this.headers
              })
              .then(() => {
                let indx = this.categories.findIndex(e => e._id === idCategory);
                console.log(indx, idCategory);
                this.categories.splice(indx, 1);

                if (this.selectedCategory._id === idCategory) {
                  this.selectedCategory = undefined;
                  this.parts = [];
                }
              })
              .catch(err => {
                if (err.response.data.statusCode === 401)
                  this.$router.push("/authenticate");

                this.flashMessage.error({
                  title: "Error!!!!",
                  message: err.response.data.error || "Error to remove category"
                });
              });
          }
        })
        .catch(err => {
          this.flashMessage.err({
            title: "Error!!!!",
            message: err
          });
        });
    },

    addNewProduct() {
      this.paramsModal.title = "Add new product";
      this.paramsModal.textButton = "Save";
      this.paramsModal.url = "/api/protected/admin/product";
      this.paramsModal.isCreate = true;
      this.paramsModal.data = {
        name: "",
        serialNumber: "",
        dim: "",
        description: "",
        price: 0,
        stock: 0,
        pictureUrl: join(__dirname, "..", "uploads", "parts", "notFound.jpg"),
        category: this.selectedCategory._id
      };

      this.$bvModal.show("modalBase");
    },

    editProduct(data) {
      this.paramsModal.title = "Edit product";
      this.paramsModal.textButton = "Save";
      this.paramsModal.url = `/api/protected/admin/product/${data._id}`;
      this.paramsModal.isCreate = false;
      this.paramsModal.data = data;

      this.$bvModal.show("modalBase");
    },

    removeProduct(id) {
      this.axios
        .delete(`/api/protected/admin/product/${id}`, { headers: this.headers })
        .then(data => {
          let indx = this.parts.indexOf(p => p._id === id);
          this.parts.splice(indx, 1);

          this.flashMessage.success({
            title: "Product removed",
            message: `${data.data.name} removed successfully!!`
          });
        })
        .catch(err => {
          this.flashMessage.error({
            title: "Error!!!!",
            message: err.response.data.error || "Not removed product"
          });
        });
    },

    partsChange(part) {
      //val => Object con todo lo de la pieza que se agrega

      if (this.paramsModal.isCreate) {
        this.parts.push(part);
      } else {
        let indx = this.parts.findIndex(e => e._id === part._id);
        if (indx > -1) this.parts[indx] = part;
      }

      // if (this.parts.length < this.perPage) this.parts.push(part);
    },
    ...mapActions(["addToCart"])
  },
  computed: {
    ...mapState(["headers"])
  }
};
</script>