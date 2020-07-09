<template>
  <div id="searchBar" style="display: none;">
    <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4 w3-padding-16">
      <div class="input-group container">
        <input
          type="search"
          v-model="querySearch"
          placeholder="What're you searching for?"
          aria-describedby="button-addon1"
          class="form-control border-0 bg-light"
          style="text-align: center;"
          autofocus
        />
        <div class="input-group-append">
          <i class="fa fa-search w3-padding w3-xlarge w3-text-blue"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar"
};
</script>