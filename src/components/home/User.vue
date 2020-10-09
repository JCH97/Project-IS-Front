<template>
  <div>
    <b-modal
      size="xl"
      id="modalTableUser"
      ref="modalTableUser"
      title="Usuarios"
      ok-only
      hide-footer
    >
      <b-table
        id="userTable"
        sticky-header
        striped
        hover
        :items="items"
        :fields="fields"
        responsive="sm"
      >
        <template v-slot:cell(show_details)="row">
          <router-link to>
            <b-icon-pencil class="h5" @click="row.toggleDetails" variant="success"></b-icon-pencil>
          </router-link>
        </template>

        <template v-slot:row-details="row">
          <b-card v-model="row.item.roles">
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>Discount in percent:</b>
              </b-col>
              <b-col cols="3">
                <b-form-input type="number" v-model="row.item.discount"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>ADMIN?:</b>
              </b-col>
              <b-col cols="3">
                <b-form-checkbox v-model="row.item.isAdmin"></b-form-checkbox>
              </b-col>
            </b-row>

            <b-button class="mr-4" variant="danger" size="sm" @click="row.toggleDetails">Close</b-button>
            <b-button variant="success" size="sm" @click="save(row.item)">Save</b-button>
          </b-card>
        </template>
      </b-table>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      fields: [
        {
          key: "email",
          label: "EMAIL"
        },
        {
          key: "phone",
          label: "PHONE"
        },
        {
          key: "invertMoney",
          label: "INVERT MONEY",
          sortable: true
        },
        {
          key: "discount",
          label: "DISCOUNT",
          sortable: true
        },
        {
          key: "isAdmin",
          label: "Is admin ?"
        },
        {
          key: "show_details",
          label: "EDIT"
        }
      ],
      items: [],
      page: 1,
      limit: 25
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function() {
      this.axios
        .post(
          "/user/paginated",
          { paginator: { page: this.page, limit: this.limit }, filter: {} },
          { headers: this.$store.state.headers }
        )
        .then(res => {
          this.items = res.data.items.map(u => {
            return { ...u, isAdmin: u.roles.includes("ADMIN") ? true : false };
          });
        })
        .catch(e => {
          if (e.response.status === 401) this.$router.push("/authenticate");
        });
    },
    save: function(data) {
      //data: User
      data.roles = ["USER"];
      if (data.isAdmin) data.roles.push("ADMIN");

      this.axios.put(
        "/user",
        {
          filter: { _id: data._id },
          updt: { roles: data.roles, discount: data.discount }
        },
        { headers: this.$store.state.headers }
      );

      this.$root.$emit("bv::hide::modal", 'modalTableUser');
    }
  },
  makeAdmin: function(user) {
    user.roles.push("ADMIN");
    console.log(user);
  }
};
</script>