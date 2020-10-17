<template>
  <div>
    <FlashMessage :position="'right top'"></FlashMessage>
    <SearchBar @changeQuerySearch="querySearch" />
    <ModalBase :params="paramsModal" @partsChange="partsChange" />
    <ModalCreateCategoryModel @newCategory="newCategory" />
    <ModalCreateAuction @dataAuction="dataAuction" />
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
              <li
                v-for="item in categories"
                :key="item._id"
                :id="`id${item._id}`"
              >
                <b-icon-trash
                  v-if="isAdmin"
                  variant="danger"
                  @click="categoryDelete(item._id)"
                ></b-icon-trash>
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
                    @click="categoryDelete(item, false)"
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
              <div
                class="product-topbar d-xl-flex align-items-end justify-content-between"
              >
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
            <div
              class="col-12 col-sm-6 col-md-12 col-xl-6"
              v-for="item in parts"
              :key="item._id"
            >
              <div class="single-product-wrapper">
                <!-- Product Image -->
                <div class="product-img">
                  <img class="w3-animate-zoom" :src="item.pictureUrl.url" alt />
                  <!-- Hover Thumb -->
                  <img class="hover-img" :src="item.pictureUrl.url" alt />
                </div>

                <!-- Product Description -->
                <div
                  class="product-description d-flex align-items-center justify-content-between"
                >
                  <!-- Product Meta Data -->
                  <div class="product-meta-data">
                    <div class="line"></div>
                    <p class="product-price">${{ item.price }}</p>
                    <router-link
                      :to="{
                        name: 'ProductDetail',
                        params: { productId: item._id }
                      }"
                    >
                      <h6>{{ item.name }}</h6>
                    </router-link>
                  </div>
                  <!-- Ratings & Cart -->
                  <div class="ratings-cart text-right">
                    <div class="ratings">
                      <b-form-rating
                        variant="warning"
                        size="sm"
                        inline
                        show
                        clear
                      ></b-form-rating>
                    </div>
                    <div>
                      <router-link
                        to
                        v-b-tooltip.hover.left
                        t
                        :title="
                          item.stock <= 0
                            ? 'Stock empty, contact with admin'
                            : 'Add to cart'
                        "
                      >
                        <div v-if="item.stock <= 0">
                          <b-iconstack font-scale="2">
                            <b-icon stacked icon="cart4" animation="fade"></b-icon>
                            <b-icon
                              stacked
                              icon="slash-circle"
                              variant="danger"
                            ></b-icon>
                          </b-iconstack>
                        </div>
                        <div v-else>
                          <b-icon-cart4
                            font-scale="2"
                            @click="addToCart({ product: item, quantity: 1 })"
                          ></b-icon-cart4>
                        </div>
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
                        v-b-tooltip.hover.top
                        class="h5"
                        title="Remove product"
                        variant="danger"
                      ></b-icon-trash>
                      <b-icon-arrow-up-circle-fill
                        @click="makeAuction(item._id, item.stock)"
                        v-b-tooltip.hover.right
                        class="h5"
                        :title="item.stock <= 0 ? 'Stock empty, you can\'t create auction': 'Create auction'"
                        variant="warning"
                      ></b-icon-arrow-up-circle-fill>
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
                    v-for="item in numberOfPages"
                    :key="item"
                    :id="`n${item}`"
                    @click="changeNumberPage(item)"
                    :class="{ active: item === 1 }"
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
import SearchBar from "@/components/SearchBar.vue";
import ModalCreateAuction from "@/components/auction/modal.data.auction.vue";
import { mapActions } from "vuex";
export default {
  name: "Principal",
  components: {
    Menu,
    ModalBase,
    ModalCreateCategoryModel,
    SearchBar,
    ModalCreateAuction
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
      perPage: 2,
      numberOfPages: 0,
      query: "",
      productIdAuction: "",
      paramsModal: {
        title: "",
        textButton: "",
        isCreate: true,
        data: undefined
      }
    };
  },
  mounted() {
    //select categories' list
    this.axios
      .post(
        "/category/all",
        { filter: {} },
        { headers: this.$store.state.headers }
      )
      .then(res => {
        this.categories = res.data;
        this.changeClassInCategoryList(res.data[0], true);
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
    changeClassInCategoryList: function(category, forCreate = false) {
      //format of Category { name: ?, _id: ? }
      if (!forCreate) {
        //select the element with active clase for remove later
        let d = document.querySelector("li.active");
        if (d) d.classList.remove("active");

        //fill new active class
        document.querySelector(`#id${category._id}`).classList.add("active");

        this.page = 1;
        // this.changeNumberPage(1);
      }

      this.selectedCategory = category;
      this.getNewPageToProduct();
    },

    getNewPageToProduct: function() {
      let data = {
        paginator: {
          page: this.page,
          limit: this.perPage
        },
        filter: {
          category: this.selectedCategory._id,
          name: { $regex: `.*${this.query}.*`, $options: "i" }
        }
      };

      this.axios
        .post("/product/paginated", data, {
          headers: this.$store.state.headers
        })
        .then(res => {
          this.parts = res.data.items;
          this.numberOfPages = Math.ceil(
            parseFloat(res.data.total) / parseFloat(this.perPage)
          );
        })
        .catch(err => {
          this.flashMessage.error({
            title: "Error!!!!",
            message:
              err.response.data ||
              "Error to get data from the server, refresh page plase"
          });
        });
    },

    changeNumberPage: function(newNumber) {
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

    newCategory: function(category) {
      this.categories.push(category);
    },

    categoryDelete: function(idCategory) {
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
              .delete("/category", {
                headers: this.$store.state.headers,
                data: { filter: { _id: idCategory } }
              })
              .then(() => {
                let indx = this.categories.findIndex(e => e._id === idCategory);
                this.categories.splice(indx, 1);

                if (this.selectedCategory._id === idCategory) {
                  this.selectedCategory = undefined;
                  this.parts = [];
                }
              })
              .catch(err => {
                if (err.response.status === 401)
                  this.$router.push("/authenticate");

                this.flashMessage.error({
                  title: "Error!!!!",
                  message: err.response.data || "Error to remove category"
                });
              });
          }
        })
        .catch(err => {
          this.flashMessage.err({
            title: "Error!!!!",
            message: err.response.data
          });
        });
    },

    addNewProduct: function() {
      this.paramsModal.title = "Add new product";
      this.paramsModal.textButton = "Save";
      this.paramsModal.isCreate = true;
      this.paramsModal.data = {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        pictureUrl: undefined,
        category: this.selectedCategory._id
      };

      this.$bvModal.show("modalBase");
    },

    editProduct: function(data) {
      this.paramsModal.title = "Edit product";
      this.paramsModal.textButton = "Save";
      this.paramsModal.isCreate = false;
      this.paramsModal.data = data;

      this.$bvModal.show("modalBase");
    },

    removeProduct: function(id) {
      this.axios
        .delete("/product", {
          headers: this.$store.state.headers,
          data: { filter: { _id: id } }
        })
        .then(data => {
          let indx = this.parts.indexOf(p => p._id === id);
          this.parts.splice(indx, 1);

          this.flashMessage.success({
            title: "Product removed",
            message: `${data.data.name} removed successfully!!`
          });
        })
        .catch(err => {
          if (err.response.status === 401) this.$router.push("/authenticate");
          this.flashMessage.error({
            title: "Error!!!!",
            message: err.response.data || "Not removed product"
          });
        });
    },

    partsChange: function(part) {
      //part => Producto que se cambio o se agrego

      if (this.paramsModal.isCreate) {
        if (this.parts.length < this.perPage) {
          //si el producto cabe en la pagina actual
          this.parts.push(part);
        } else {
          //recalcular el numero de paginas
          this.axios
            .post(
              "/product/count",
              { filter: { category: part.category } },
              { headers: this.$store.state.headers }
            )
            .then(
              res => (this.numberOfPages = Math.ceil(res.data / this.perPage))
            );
        }
      } else {
        let indx = this.parts.findIndex(e => e._id === part._id);
        if (indx > -1) this.parts[indx] = part;
      }

      // if (this.parts.length < this.perPage) this.parts.push(part);
    },

    querySearch: function(query) {
      this.query = query;

      this.changeNumberPage(1);
    },

    dataAuction(data) {
      let { price, duration } = data;
      this.axios
        .post(
          "/auction",
          {
            data: { initPrice: parseInt(price), actualPrice: parseInt(price), duration, product: this.productIdAuction }
          },
          { headers: this.$store.state.headers }
        )
        .then(() => {
          this.$store.dispatch("setLengthAuction");
          this.axios.put(
            "/product",
            {
              filter: { _id: this.productIdAuction },
              updt: { $inc: { stock: -1 } }
            },
            { headers: this.$store.state.headers }
          );
        })
        .catch(e => {
          if (e.response.status === 401) this.$router.push("/authenticate");
        });
    },

    makeAuction(productId, productStock) {
      if(productStock <= 0) return;

      this.productIdAuction = productId;
      this.$bvModal.show("modalDataAuction");
    },

    ...mapActions(["addToCart"])
  }
};
</script>