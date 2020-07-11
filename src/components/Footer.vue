<template>
  <div>
    <footer class="footer_area clearfix">
      <div class="container">
        <div class="row align-items-center">
          <!-- Single Widget Area -->
          <div class="col-12 col-lg-4">
            <div class="single_widget_area">
              <!-- Logo -->
              <div class="footer-logo mr-50">
                <a href="index.html">
                  <img src="img/core-img/logo.png" width="150px" height="150px" alt />
                </a>
              </div>
              <!-- Copywrite Text -->
              <p class="copywrite">
                <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                Copyright &copy;
                2020 Designer / Developer:
                <a
                  href="mailto:jc1997hdez@gmail.com"
                  target="_blank"
                >JCH</a>
                <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
              </p>
            </div>
          </div>
          <!-- Single Widget Area -->
          <div class="col-12 col-lg-8">
            <div class="single_widget_area">
              <!-- Footer Menu -->
              <div class="footer_menu">
                <nav class="navbar navbar-expand-lg justify-content-end">
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#footerNavContent"
                    aria-controls="footerNavContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <i class="fa fa-bars"></i>
                  </button>
                  <div class="collapse navbar-collapse" id="footerNavContent">
                    <ul class="navbar-nav ml-auto">
                      <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                      </li>
                      <li class="nav-item">
                        <router-link class="nav-link" to="/shop">Shop</router-link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>