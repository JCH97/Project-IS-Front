<template>
  <div>
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
                v-for="item in modelsOfBrand"
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
                  <p>Showing 1-8 0f 25 {{ this.selectedBrandModel.brand }} / {{ this.selectedBrandModel.model }}</p>
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
                    <a href="product-details.html">
                      <h6>{{ item.description }}</h6>
                    </a>
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
                      <a
                        href="cart.html"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Add to Cart"
                      >
                        <img src="img/core-img/cart.png" alt />
                      </a>
                    </div>
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
                  <li class="page-item">
                    <a class="page-link" href="#">01.</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">02.</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">03.</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">04.</a>
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
export default {
  name: "Principal",
  components: {
    Menu
  },
  data() {
    return {
      brands: [],
      modelsOfBrand: [],
      selectedBrandModel: {
        brand: "",
        model: "",
        id: ""
      },
      parts: [], //esta es la ventana de piezas del carro y modelo seleccionados
      page: 1,
      perPage: 6
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

      //get id
      this.getIdOfSelectedBrandModel();

      //get products to paginate
      this.getNewPageToProduct();
    },
    getModelTo(brand) {
      this.axios
        .get(`/api/car/getModels/${brand}`)
        .then(data => (this.modelsOfBrand = data.data));
    },
    getIdOfSelectedBrandModel() {
      this.axios
        .get(
          `/api/car/getCar/${this.selectedBrandModel.brand}@${this.selectedBrandModel.model}`
        )
        .then(data => {
          this.selectedBrandModel.id = data.data;
        });
    },
    getNewPageToProduct() {
      const data = {
        id: this.selectedBrandModel.id,
        perPage: this.perPage,
        page: this.page
      };

      this.axios.post("/api/part/perPage", data).then(data => {
        this.parts = data.data;
      });
    }
  }
};
</script>