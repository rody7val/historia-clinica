<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary z-1">
      <!-- input paciente.name -->
      <q-input v-if="!formFlow.name"
        v-model="newPaciente.name"
        @keyup.enter="addPacienteName"
        filled
        square
        class="col"
        bg-color="white"
        label="Nuevo paciente"
        placeholder="Nombre"
        required>
        <template v-slot:append>
          <q-btn
            @click="addPacienteName"
            round
            flat
            icon="play_arrow" />
        </template>
      </q-input>
      <!-- input paciente.dog -->
      <q-select v-if="formFlow.name && !formFlow.dog"
        v-model="newPaciente.dog"
        :options="options.dog"
        label="Perro o Gato?"
        class="col bg-white"
        autofocus
        filled
        square
        required>
        <template v-slot:append>
          <q-btn
            @click="goToPacientName"
            round
            flat
            icon="skip_previous" />
          <q-btn
            @click="addPacienteDog"
            round
            flat
            icon="play_arrow" />
        </template>
      </q-select>
      <!-- input paciente.feme -->
      <q-select v-if="formFlow.name && formFlow.dog && !formFlow.feme"
        v-model="newPaciente.feme"
        :options="options.feme"
        label="Macho o Hembra?"
        class="col bg-white"
        autofocus
        filled
        square
        required>
        <template v-slot:append>
          <q-btn
            @click="goToPacientDog"
            round
            flat
            icon="skip_previous" />
          <q-btn
            @click="addPaciente"
            round
            flat
            icon="check" />
        </template>
      </q-select>
    </div>
    <!-- Pacientes -->
    <q-list
      separator
      bordered
      style="width: 100%"
      class="bg-white">
      <q-item
        v-for="(item, key) in $store.state.pacientes.data"
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
        <!-- viewCliente() -->
        <q-item-section
          v-if="item.done"
          side>
          <q-btn
            flat
            round
            :to="'/clientes/'+$route.params.id+'/pacientes/'+item.id"
            color="primary"
            icon="visibility" />
        </q-item-section>
        <!-- deletePaciente() -->
        <q-item-section
          v-if="item.done"
          side>
          <q-btn
            @click.stop="deletePaciente(item.id)"
            flat
            round
            color="primary"
            icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- sin datos -->
    <div v-if="!Object.keys($store.state.pacientes.data).length" class="no-items absolute-center">
      <q-icon
        name="fa fa-user-md"
        size="100px"
        color="primary"></q-icon>
      <div class="text-h5 text-primary text-center">
        Sin pacientes
      </div>
    </div>
  </q-page>
</template>

<script >
export default {
  name: 'viewCliente',

  data(){
    return{
      newPaciente: {
        created: Date.now(),
        idCliente: this.$route.params.id,
        name: '',
        dog: undefined,
        feme: undefined,
        birthday: NaN,
        done: false,
      },
      formFlow: {
        name: '',
        dog: '',
        feme: '',
      },
      options: {
        dog: [ "Perro", "Gato" ],
        feme: [ "Macho", "Hembra"]
      }
    }
  },

  mounted() {
    this.$store.commit('changeSubtitleRight', '')
    this.$store.commit('changeIconRight', '')
    this.$store.commit('resetPacientes')
    // sync firestore.pacientes
    const where = [['idCliente', '==', this.$route.params.id]]
    const orderBy = ['created']
    this.$store.dispatch('pacientes/openDBChannel', { clauses: {where,orderBy} })
    // get cliente.id
    this.$store.dispatch('clientes/fetchById', this.$route.params.id)
    .then(() => {
      // change props header
      this.$store.commit('changeTitle', this.$store.state.clientes.data[this.$route.params.id].name)
      this.$store.commit('changeSubtitleLeft', this.$store.state.clientes.data[this.$route.params.id].tel)
      this.$store.commit('changeIconLeft', 'phone')
    })
  },

  beforeDestroy () {
    // reset
    this.$store.dispatch('pacientes/closeDBChannel', { clearModule: true })
  },
  
  methods: {
    handleDone(id) {
      this.$store.commit('handleDonePacientes', id)
    },
    goToPacientName() {
      this.formFlow.name = ''
    },
    goToPacientDog() {
      this.formFlow.dog = ''
    },
    addPacienteName() {
      this.formFlow.name = this.newPaciente.name
    },
    addPacienteDog() {
      this.formFlow.dog = this.newPaciente.dog
    },
    addPaciente() {
      if (!this.newPaciente.dog) {
        return
      }
      let id = this.$route.params.id
      // let pacientes = this.$store.state.pacientes.data.concat(this.newPaciente)
      console.log(this.newPaciente)
      this.$store.dispatch('pacientes/set', this.newPaciente)
      //this.$store.dispatch('clientes/patch', { id, pacientes })
      this.newPaciente = {
        created: Date.now(),
        idCliente: this.$route.params.id,
        name: '',
        birthday: undefined,
        done: false,
      }
      this.formFlow = {
        name: '',
        dog: '',
      }
    },
    deletePaciente(id) {
      let name = this.$store.state.pacientes.data[id].name
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Borrar el paciente '+name.toUpperCase()+'?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('pacientes/delete', id)
        this.$q.notify({
          message: 'Borrado!',
          color: 'purple'
        })
      })
    },
  },
}
</script>