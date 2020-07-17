<template>
  <div>
    <ModalCreateProduct :idCar="modelsOfBrand[parseInt(selectedBrandModel.model)]" />
    <div class="main-content-wrapper d-flex clearfix">
      <Menu />
      <div class="shop_sidebar_area">
        <!-- ##### Single Widget ##### -->
        <div class="widget catagory mb-50">
          <!-- Widget Title -->
          <h6 class="widget-title mb-30">Brands' list:</h6>

          <!--  Catagories  -->
          <div class="catagories-menu">
            <ul>
              <li
                v-for="item in brands"
                :key="item"
                :id="item"
                @click="changeClassInBrandList(item)"
              >
                <router-link to>{{ item }}</router-link>
              </li>
            </ul>
          </div>
          <hr />
          <h6 class="widget-title mb-30">Models' list:</h6>
          <div class="catagories-menu">
            <ol>
              <li
                v-for="item in Object.keys(modelsOfBrand)"
                :key="item"
                :id="`m${item}`"
                @click="changeClassInModelList(item)"
              >
                <router-link to>{{ item }}</router-link>
              </li>
            </ol>
          </div>
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
                    Showing {{ this.perPage * (this.page - 1) + 1 }} - {{ this.page * this.perPage }} 0f {{ this.numberOfPages }} [ {{ this.selectedBrandModel.brand }} / {{ this.selectedBrandModel.model }} ]
                    <router-link
                      to
                      v-if="isAdmin && selectedBrandModel.brand && selectedBrandModel.model"
                    >
                      <b-icon-gear-wide-connected
                        v-b-modal.modalCreateProduct
                        v-b-tooltip.hover.right
                        title="Add new product"
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
                  <img class="w3-animate-zoom" src="img/product-img/notFound.jpg" alt />
                  <!-- Hover Thumb -->
                  <img class="hover-img" src="img/product-img/notFound.jpg" alt />
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
                      <i class="fa fa-star" aria-hidden="true"></i>
                      <i class="fa fa-star" aria-hidden="true"></i>
                      <i class="fa fa-star" aria-hidden="true"></i>
                      <i class="fa fa-star" aria-hidden="true"></i>
                      <i class="fa fa-star" aria-hidden="true"></i>
                    </div>
                    <div class="cart">
                      <router-link to v-b-tooltip.hover.left title="Add to cart">
                        <img
                          src="img/core-img/cart.png"
                          @click="addToCart({product: item, quantity:1})"
                        />
                      </router-link>
                    </div>
                    <router-link
                      v-if="isAdmin && selectedBrandModel.brand && selectedBrandModel.model"
                      class="w3-padding-tiny"
                      to
                      v-b-tooltip.hover.right
                      title="Edit product"
                    >
                      <b-icon-pencil></b-icon-pencil>
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
import ModalCreateProduct from "@/components/shop/ModalCreateProduct.vue";
import { mapActions } from "vuex";
export default {
  name: "Principal",
  components: {
    Menu,
    ModalCreateProduct
  },
  props: {
    isAdmin: Boolean
  },
  data() {
    return {
      brands: [],
      modelsOfBrand: {}, //{ model1: id, model2: id, ...} vienen todos los modelos de brandSelected con el id correspondiente
      selectedBrandModel: {
        brand: "",
        model: ""
      },
      parts: [], //esta es la ventana de piezas del carro y modelo seleccionados
      page: 1,
      perPage: 6,
      numberOfPages: 0
    };
  },
  created() {
    //select brands' list
    this.axios.get("/api/car/brands").then(data => {
      this.brands = data.data;

      this.selectedBrandModel.brand = this.brands[0];
      document
        .querySelector(`#${this.selectedBrandModel.brand}`)
        .classList.add("active");
    });
  },
  methods: {
    changeClassInBrandList(brand) {
      //select the element with active clase for remove later
      let d = document.querySelector("li.active");
      if (d) d.classList.remove("active");

      //fill new active class
      document.querySelector(`#${brand}`).classList.add("active");
      this.selectedBrandModel.brand = brand;
      this.selectedBrandModel.model = "";

      //get models of selected brand
      this.getModelTo(brand);
    },
    changeClassInModelList(model) {
      //select element of models' list with active class for remove later
      let d = document.querySelector("ol > li.active");
      if (d) d.classList.remove("active");

      //fill new active class
      document.querySelector(`#m${model}`).classList.add("active");
      this.selectedBrandModel.model = model;

      //get products to paginate
      this.getNewPageToProduct();
    },
    getModelTo(brand) {
      this.axios
        .get(`/api/car/getModels/${brand}`)
        .then(data => (this.modelsOfBrand = data.data));
    },
    getNewPageToProduct() {
      const data = {
        id: this.modelsOfBrand[this.selectedBrandModel.model],
        perPage: this.perPage,
        page: this.page
      };

      this.axios.post("/api/part/perPage", data).then(data => {
        this.parts = data.data.parts;
        this.numberOfPages = Math.ceil(
          parseFloat(data.data.count) / parseFloat(this.perPage)
        );
      });
    },
    changeNumberPage(newNumber) {
      this.page = newNumber;
      this.getNewPageToProduct();

      let list = document.querySelectorAll("li.page-item");
      console.log(list);
      for (let i = 0; i < list.length; i++)
        if (list[i].classList.contains("active")) {
          list[i].classList.remove("active");
          break;
        }

      document.querySelector(`#n${newNumber}`).classList.add("active");
    },
    ...mapActions(["addToCart"])
  }
};
</script>