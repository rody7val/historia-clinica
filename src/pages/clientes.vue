<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <!-- input name -->
      <q-input v-if="!flow.name"
        v-model="clientName"
        @keyup.enter="addClientName"
        filled
        square
        class="col z-1"
        bg-color="white"
        label="Nuevo cliente"
        placeholder="Nombre"
        required>
        <template v-slot:append>
          <q-btn
            @click="addClientName"
            round
            flat
            icon="play_arrow" />
        </template>
      </q-input>
      <!-- input tel -->
      <q-input v-if="flow.name && !flow.tel"
        v-model="clientTel"
        @keyup.enter="addClient"
        bg-color="white"
        class="col"
        label="Y adjunta un contacto"
        placeholder="Teléfono, Dirección, etc..."
        filled
        square
        autofocus
        required>
        <template v-slot:append>
          <q-btn
            @click="goToClientName"
            round
            flat
            icon="skip_previous" />
          <q-btn
            @click="addClient"
            round
            flat
            icon="check" />
        </template>
      </q-input>

    </div>
    <!-- clientes colection firestore  -->
    <q-list
      separator
      bordered
      style="width: 100%"
      class="bg-white roboto">
      <q-item
        v-for="(item, key) in $store.state.clientes.data"
        :key="key"
        @click="handleDone(item.id)"
        :class="{'done bg-blue-1': item.done}"
        clickable
        v-ripple>
        <!-- cliente.done -->
        <q-item-section avatar>
          <q-checkbox
            v-model="item.done"
            class="no-pointer-events"
            color="primary" />
        </q-item-section>
        <!-- cliente.name -->
        <q-item-section>
          <q-item-label class="ellipsis">{{item.name}}</q-item-label>
        </q-item-section>
        <!-- cliente.viewCliente() -->
        <q-item-section
          v-if="item.done"
          side>
          <q-btn
            flat
            round
            :to="'/clientes/'+item.id"
            color="primary"
            icon="visibility" />
        </q-item-section>
        <!-- cliente.deleteCliente() -->
        <q-item-section
          v-if="item.done"
          side>
          <q-btn
            @click.stop="deleteClient(item.id)"
            flat
            round
            color="primary"
            icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- sin datos -->
    <div v-if="!Object.keys($store.state.clientes.data).length"
      class="no-items absolute-center z-0">
    	<q-icon
    	  name="fa fa-user"
    	  size="100px"
    	  color="primary"></q-icon>
    	<div class="text-h5 text-primary text-center">
    		Sin clientes
    	</div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'clientes',

  data() {
    return {
    	clientName: '',
      clientTel: '',
      flow: {
        created: Date.now(),
        name: '',
        tel: '',
      }
    }
  },

  mounted() {
    this.$store.commit('resetClientes')
    // sync firestoreDB.clientes
    const orderBy = ['name']
    this.$store.dispatch('clientes/openDBChannel', { clauses: {orderBy} })
    // change props header
    this.$store.commit('changeTitle', 'Historia Clínica')
    this.$store.commit('changeSubtitleLeft', this.toDay())
    this.$store.commit('changeIconLeft', 'la la-calendar')
  },

  beforeDestroy () {
    // close sync
    this.$store.dispatch('clientes/closeDBChannel', { clearModule: true })
  },
  
  methods: {
    toDay() {
      return date.formatDate(Date.now(), 'DD/MM/YYYY')
    },
    handleDone(id) {
      // switch checkbox store clientes.done
      this.$store.commit('handleDoneClientes', id)
    },
    deleteClient(id) {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Borrar el cliente '+ this.$store.state.clientes.data[id].name.toUpperCase() +'?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('clientes/delete', id)
	      this.$q.notify({
	        message: 'Borrado!',
	        color: 'purple'
	      })
      })
    },
    goToClientName() {
      this.flow.name = ''
    },
    addClientName() {
      console.log()
      this.flow.name = this.clientName
    },
    addClient() {
      // ingresar un numero
      if (!this.clientTel) {
        return
      }
      this.flow.tel = this.clientTel
      this.$store.dispatch('clientes/set', {
        name: this.clientName,
        tel: this.clientTel,
        done: false
      })
      this.clientName = ""
      this.clientTel = ""
      this.flow = {
        name: "",
        tel: "",
      }
    },
  }
}
</script>

<style lang="scss">
	.done {
		.q-item__label {
			text-decoration: line-through;
			color: #bbb;
		}
	}
	.no-items{
		opacity: 0.5
	}
</style>