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
                <b>Descuento:</b>
              </b-col>
              <b-col cols="3">
                <b-form-input type="number" v-model="row.item.discount"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>Es admin?</b>
              </b-col>
              <b-col cols="3">
                <b-form-checkbox v-model="row.item.isAdmin"></b-form-checkbox>
              </b-col>
            </b-row>

            <b-button class="mr-4" variant="danger" size="sm" @click="row.toggleDetails">Cerrar</b-button>
            <b-button v-if="!hide" variant="success" size="sm" @click="save(row.item)">Guardar</b-button>
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
          label: "Nombre completo",
          sortable: true
        },
        {
          key: "userName",
          label: "Nombre de usuario"
        },
        {
          key: "email",
          label: "Correo"
        },
        {
          key: "phone",
          label: "Teléfono"
        },
        {
          key: "invertMoney",
          label: "Dinero invertido",
          sortable: true
        },
        {
          key: "discount",
          label: "Descuento",
          sortable: true
        },
        {
          key: "isAdmin",
          label: "Es admin? "
        },
        {
          key: "show_details",
          label: "Editar"
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
        .get("/api/protected/user", { headers: this.headers })
        .then(res => {
          this.items = res.data;
        });
    },
    save(data) {
      console.log(data._id);
      this.hide = true;
      this.axios.put(
        `/api/protected/user/${data._id}`,
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