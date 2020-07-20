<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.axios
      .get("/checkToken", {
        headers: {
          "x-access-token": localStorage.getItem(
            "accessToken" || JSON.stringify("")
          )
        }
      })
      .catch(() => {
        localStorage.clear();
      });
  }
};
</script>
