<template>
  <div>
    <FlashMessage></FlashMessage>
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100">
          <div class="login100-form validate-form">
            <span class="login100-form-title p-b-26">Bienvenidos</span>

            <input type="hidden" name="login" :value="this.login" />

            <div class="wrap-input100">
              <input
                class="input100"
                type="text"
                id="userName"
                name="userName"
                placeholder="Nombre de usuario"
                v-model="data.userName"
              />
            </div>

            <div class="wrap-input100">
              <span class="btn-show-pass">
                <i class="zmdi zmdi-eye" @click="changeClassToShowPassword()"></i>
              </span>
              <input
                class="input100"
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                v-model="data.password"
              />
            </div>

            <div v-if="!this.login">
              <div class="wrap-input100">
                <input
                  class="input100"
                  type="text"
                  name="firstName"
                  v-model="data.firstName"
                  placeholder="Nombre"
                />
              </div>

              <div class="wrap-input100">
                <input
                  class="input100"
                  type="text"
                  name="lastName"
                  v-model="data.lastName"
                  placeholder="Apellidos"
                />
              </div>

              <div class="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                <input
                  class="input100"
                  type="email"
                  name="email"
                  v-model="data.email"
                  placeholder="Email"
                />
              </div>

              <div class="wrap-input100">
                <input
                  class="input100"
                  type="tel"
                  name="phone"
                  v-model="data.phone"
                  placeholder="Telefono"
                />
              </div>
            </div>

            <div class="container-login100-form-btn">
              <div class="wrap-login100-form-btn">
                <div class="login100-form-bgbtn"></div>
                <button v-if="this.login" class="login100-form-btn" @click="sendFormLogin()">Login</button>
                <button
                  v-if="!this.login"
                  class="login100-form-btn"
                  @click="sendFormRegister()"
                >Registro</button>
              </div>
            </div>

            <div class="text-center p-t-115">
              <span class="txt1">No tiene cuenta?</span>

              <button v-if="this.login" class="txt2" @click="changeType()">~Registro</button>
              <button v-if="!this.login" class="txt2" @click="changeType()">~Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: true,
      data: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    sendFormLogin() {
      this.axios
        .post("/authenticate", {
          data: this.data
        })
        .then(res => {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("user", JSON.stringify(res.data.toWork));

          this.$router.push("/");
        })
        .catch(err => {
          this.flashMessage.error({
            title: "Error!!!",
            message: err.response.data.error
          });
        });
    },
    sendFormRegister() {
      this.axios
        .post("/register", { data: this.data })
        .then(res => {
          this.flashMessage.success({
            title: "Confirmacion de registro",
            message: `${res.data.userName} ha realizado su registro correctamente`
          });
          this.login = true;
        })
        .catch(err => {
          this.flashMessage.error({
            title: "Error!!!",
            message: err.response.data.error
          });
        });
    },
    changeType() {
      this.login = !this.login;
    },
    changeClassToShowPassword() {
      let classEyeOpen = "zmdi-eye";
      let classEyeClose = "zmdi-eye-off";

      let open = document.querySelector(`i.${classEyeOpen}`);
      let close = document.querySelector(`i.${classEyeClose}`);

      if (open) {
        open.classList.remove(classEyeOpen);
        open.classList.add(classEyeClose);

        document.querySelector("#password").type = "text";
      } else {
        close.classList.remove(classEyeClose);
        close.classList.add(classEyeOpen);

        document.querySelector("#password").type = "password";
      }
    }
  }
};
</script>

<style src="@/assets/css/main.css"></style>
<style src="@/assets/css/util.css"></style>
<style src="@/assets/vendor/bootstrap/css/bootstrap.min.css"></style>
<style src="@/assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css"></style>
<style src="@/assets/fonts/iconic/css/material-design-iconic-font.min.css"></style>
<style src="@/assets/vendor/animate/animate.css"></style>
<style src="@/assets/vendor/css-hamburgers/hamburgers.min.css"></style>
<style src="@/assets/vendor/animsition/css/animsition.min.css"></style>
<style src="@/assets/vendor/select2/select2.min.css"></style>
<style src="@/assets/vendor/daterangepicker/daterangepicker.css"></style>