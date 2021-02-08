<template>
  <q-page class="q-pa-sm z-1">
    <!-- search radio filter -->
    	<!-- Clientes-->
      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio
            v-model="collectionRadioFilter"
            val="clientes"
            @input="radioClick"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>Clientes</q-item-label>
          <q-item-label caption>{{getClientesCount}}</q-item-label>
        </q-item-section>
      </q-item>
    	<!-- Pacientes-->
      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio
            v-model="collectionRadioFilter"
            val="pacientes"
            @input="radioClick"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>Pacientes</q-item-label>
          <q-item-label caption>{{getPacientesCount}}</q-item-label>
        </q-item-section>
      </q-item>
    <!-- search input -->
    <q-input
      autofocus
      v-model="search"
      @keyup="buscar"
      filled
      square
      class="col z-1"
      bg-color="white"
      label="Buscar"
      placeholder="Nombre"
      required>
    </q-input>
    <!-- list search -->
    <q-list
      bordered
      separator
      style="width: 100%"
      class="bg-white roboto rounded-borders"
    >

    <q-item
      v-for="(item, key) in listSearch"
      v-if="search.length > 0"
      :to="getRoute(item)"
      :key="key"
      clickable
      @click.prevent="searchItemClick"
      v-ripple
    >
      <q-item-section>
        <!-- name -->
        <q-item-label>{{item.name}}</q-item-label>
        <q-item-label v-if="collectionRadioFilter == 'clientes'" caption>
          {{item.tel}}
        </q-item-label>
        <q-item-label v-if="collectionRadioFilter == 'pacientes'" caption>
          {{item.dog == "Perro" ? "Perro" : "Gato"}}
          /
          {{item.feme == "Hembra" ? "Hembra" : "Macho"}}
          /
          {{Object.keys($store.state["clientes"].data).length &&
            $store.state["clientes"].data[item.idCliente]
            ? $store.state["clientes"].data[item.idCliente].name
            : null
          }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
  </q-page>
</template>

<script>
export default {	
  name: 'search',

  data() {
  	return {
      collectionRadioFilter: "clientes",
      search: "",
      listSearch: [],
  	}
  },

  mounted() {
    this.init()
  },

  computed: {
  	getClientesCount() {
  		return Object.keys(this.$store.state["clientes"].data).length
  	},
  	getPacientesCount() {
  		return Object.keys(this.$store.state["pacientes"].data).length
  	}
  },

  methods: {
    init(){
      this.$store.commit('resetClientes')
      this.$store.commit('resetPacientes')
      // sync firestoreDB.clientes
      const orderBy = ['name']
      this.$store.dispatch('clientes/openDBChannel', { clauses: {orderBy} })
      this.$store.dispatch('pacientes/openDBChannel', { clauses: {orderBy} })
    },
    searchItemClick() {
      this.dialog = false
    },
    buscar() {
      if (this.collectionRadioFilter == "clientes") {
        this.listSearch = this.$store.getters.getClientesByName(this.search)
      } else {
        this.listSearch = this.$store.getters.getPacientesByName(this.search)
      }
    },
    radioClick() {
      this.search = ""
    },
    getRoute(item) {
      // refresh links route
      if (this.collectionRadioFilter == "clientes") {
        return '/clientes/'+item.id
      } else {
        return '/clientes/'+item.idCliente+'/pacientes/'+item.id
      }
    }
  },

  beforeDestroy () {
    // close sync
    this.$store.dispatch('clientes/closeDBChannel', { clearModule: true })
    this.$store.dispatch('pacientes/closeDBChannel', { clearModule: true })
  },
}
</script>

<style style="css">

</style>