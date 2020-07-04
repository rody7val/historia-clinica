<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newItem"
        @keyup.enter="addItem"
        filled
        square
        class="col"
        bg-color="white"
        placeholder="Añadir nuevo paciente"
        dense>
        <template v-slot:append>
          <q-btn
            @click="addItem"
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
        v-for="(item, key) in pacientes"
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
          <q-item-label>{{item.title}}</q-item-label>
        </q-item-section>
        <q-item-section
          v-if="item.done"
          side>
          <q-btn
            @click.stop="deleteItem(key)"
            flat
            round
            dense
            color="primary"
            icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <div
      v-if="!pacientes.length"
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
  name: 'pacientes',

  data() {
    return {
    	newItem: "",
      pacientes: [
        {
          title: "Irma",
          done: false
        },
        {
          title: "El Choclo",
          done: true
        },
        {
          title: "Fantagui",
          done: false
        }
      ]
    }
  },

  methods: {
    deleteItem(key) {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Borrar?',
        cancel: true,
        persistent: true
      }).onOk(() => {
    		this.pacientes.splice(key, 1)
	      this.$q.notify({
	        message: 'Borrado!',
	        color: 'purple'
	      })
      })
    },
    addItem() {
    	this.pacientes.push({
    		title: this.newItem,
    		done: false
    	})
    	this.newItem = ""
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