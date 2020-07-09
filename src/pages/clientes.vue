<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newClient"
        @keyup.enter="addClient"
        filled
        square
        class="col"
        bg-color="white"
        placeholder="Añadir nuevo paciente"
        dense>
        <template v-slot:append>
          <q-btn
            @click="addClient"
            round
            dense
            flat
            icon="add" />
        </template>
      </q-input>
    </div>
    <q-list
      separator
      bordered
      class="bg-white">
      <q-item
        v-for="(item, key) in $store.state.clientes.data"
        :key="key"
        @click="item.done = !item.done"
        :class="{'done bg-blue-1': item.done}"
        clickable
        v-ripple>
        <q-item-section avatar>
          <q-checkbox
            v-model="item.done"
            class="no-pointer-events"
            color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{item.name}}</q-item-label>
        </q-item-section>
        <q-item-section
          v-if="item.done"
          side>
          <q-btn
            @click.stop="deleteClient(item.id)"
            flat
            round
            dense
            color="primary"
            icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <div
      v-if="!Object.keys($store.state.clientes.data).length"
      class="no-items absolute-center">
    	<q-icon
    	  name="check"
    	  size="100px"
    	  color="primary"></q-icon>
    	<div class="text-h5 text-primary text-center">
    		Sin datos
    	</div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'clientes',

  data() {
    return {
    	newClient: "",
    }
  },

  mounted() {
    this.$store.dispatch('clientes/openDBChannel')
  },

  methods: {
    deleteClient(id) {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Borrar el Cliente '+ this.$store.state.clientes.data[id].name +'?',
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
    addClient() {
      this.$store.dispatch('clientes/set', {
        name: this.newClient,
        done: false
      })
    	this.newClient = ""
    }
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