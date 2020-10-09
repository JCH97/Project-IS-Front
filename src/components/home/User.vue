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
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>Discount:</b>
              </b-col>
              <b-col cols="3">
                <b-form-input type="number" v-model="row.item.discount"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>Is admin?</b>
              </b-col>
              <b-col cols="3">
                <b-form-checkbox v-model="row.item.isAdmin"></b-form-checkbox>
              </b-col>
            </b-row>

            <b-button class="mr-4" variant="danger" size="sm" @click="row.toggleDetails">Close</b-button>
            <b-button v-if="!hide" variant="success" size="sm" @click="save(row.item)">Save</b-button>
          </b-card>
        </template>
      </b-table>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "User",
  data() {
    return {
      hide: false,
      fields: [
        {
          key: "fullName",
          label: "FULL NAME",
          sortable: true
        },
        {
          key: "userName",
          label: "USER NAME"
        },
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
          label: "IS ADMIN? "
        },
        {
          key: "show_details",
          label: "EDIT"
        }
      ],
      items: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios
        .get("/api/protected/admin/user", { headers: this.headers })
        .then(res => {
          this.items = res.data;
          
          let userNameLogin = (JSON.parse(localStorage.getItem('user') || JSON.stringify(""))).userName;
          let indx = this.items.findIndex(u => u.userName === userNameLogin);
          this.items.splice(indx, 1);
        });
    },
    save(data) {
      this.hide = true;
      this.axios.put(
        `/api/protected/admin/user/${data._id}`,
        { isAdmin: data.isAdmin, discount: data.discount },
        { headers: this.headers }
      );
    }
  },
  computed: {
    ...mapState(["headers"])
  }
};
</script>