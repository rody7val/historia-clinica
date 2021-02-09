<template>
  <q-page class="bg-grey-3 column">
      <div class="q-px-lg q-pb-md bg-primary">
        <!-- title -->
        <div id="title" class="shadow-text text-h5 text-white">{{getPacienteName}}</div>
        <div v-if="getPacienteType" class="text-subtitle1 q-gutter-sm">
          <!-- subtitle icon/left -->
          <q-btn color="accent" push>
            <div class="row items-center no-wrap">
              <q-icon left :name="getPacienteIconType"/>
              <div class="text-center">{{getPacienteType}}</div>
              <q-icon right left :name="getPacienteIconFeme"/>
              <div class="text-right">{{getPacienteFeme}}</div>
            </div>
          </q-btn>
        </div>
      </div>
    <div class="row q-pa-sm bg-primary z-1">
      <!-- input entrada.name -->
      <q-input
        v-model="newEntrada.desc"
        @keyup.enter="addEntrada"
        filled
        square
        class="col"
        bg-color="white"
        label="Nueva entrada"
        placeholder="Descripción de la consulta"
        required>
        <template v-slot:append>
          <q-btn
            @click="addEntrada"
            round
            flat
            icon="check" />
        </template>
      </q-input>
    </div>
    <!-- Entradas -->
    <q-list
      separator
      bordered
      style="width: 100%"
      class="bg-white">
      <q-item
        v-for="(item, key) in $store.state.entradas.data"
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
        <!-- cliente.date -->
        <q-item-section v-if="!item.done">
          <q-item-label>{{datear(item.created)}}</q-item-label>
        </q-item-section>
        <!-- cliente.desc -->
        <q-item-section>
          <q-item-label class="ellipsis">{{item.desc}}</q-item-label>
        </q-item-section>
        <!-- viewCliente() -->
        <q-item-section
          v-if="item.done"
          side>
          <q-btn
            :to="'/clientes/'+$route.params.cid+'/pacientes/'+$route.params.pid+'/entradas/'+item.id"
            flat
            round
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
    <!-- load -->
    <!-- <div v-if="$store.state.loadEntradas" class="no-items absolute-center">
      <q-spinner
        color="primary"
        size="3em"
      />
    </div> -->
    <!-- sin datos -->
    <div v-if="!Object.keys($store.state.entradas.data).length" class="no-items absolute-center z-0">
      <q-icon
        name="fa fa-stethoscope"
        size="100px"
        color="primary"></q-icon>
      <div class="text-h5 text-primary text-center">
        Sin entradas
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {	
  name: 'paciente',

  data(){
    return{
      newEntrada: {
        created: Date.now(),
        idCliente: this.$route.params.cid,
        idPaciente: this.$route.params.pid,
        files: [],
        desc: '',
        done: false,
      },
      formFlow: {
        name: '',
        dog: '',
      },
    }
  },

  beforeDestroy () {
    //this.$store.commit('changeSubtitleRight', '')
    //this.$store.commit('changeIconRight', '')
    // close sync
    this.$store.dispatch('entradas/closeDBChannel', { clearModule: true })
  },

  computed: {
    getPacienteName() {// prop, returnFalse
      return this.neverNullSingleCondition("name", "cargando...")
    },
    getPacienteType() {// prop, exact, returnTrue, returnFalse
      return this.neverNullExactCondition("dog", "Perro", "Perro", "Gato")
    },
    getPacienteIconType() {// prop, exact, returnTrue, returnFalse
      return this.neverNullExactCondition("dog", "Perro", "la la-dog", "la la-cat")
    },
    getPacienteFeme() {// prop, exact, returnTrue, returnFalse
      return this.neverNullExactCondition("feme", "Hembra", "Hembra", "Macho")
    },
    getPacienteIconFeme() {// prop, exact, returnTrue, returnFalse
      return this.neverNullExactCondition("feme", "Hembra", "la la-venus", "la la-mars")
    }
  },  

  mounted() {
    this.$store.commit('resetEntradas')
    // get entradas de un paciente.id
    const where = [['idPaciente', '==', this.$route.params.pid]]
    const orderBy = ['created']
    this.$store.dispatch('entradas/openDBChannel', { clauses: {where,orderBy} })
    // get paciente by id
    this.$store.dispatch('pacientes/fetchById', this.$route.params.pid)
  },

  methods: {
    handleDone(id) {
      this.$store.commit('handleDoneEntradas', id)
    },
    datear(data) {
      return date.formatDate(data, 'DD/MM/YYYY')
    },
    addEntrada() {
      if (!this.newEntrada.desc) {
        return
      }
      let id = this.$route.params.pid
      this.$store.dispatch('entradas/set', this.newEntrada)
      this.newEntrada = {
        created: Date.now(),
        idCliente: this.$route.params.cid,
        idPaciente: this.$route.params.pid,
        files: [],
        desc: '',
        done: false,
      }
      this.formFlow = {
        name: '',
        dog: '',
      }
    },
    neverNullSingleCondition(prop, returnFalse) {
      return this.$store.state.pacientes.data &&
        this.$store.state.pacientes.data[this.$route.params.pid]
        ? this.$store.state.pacientes.data[this.$route.params.pid][prop]
        : returnFalse
    },
    neverNullExactCondition(prop, exact, returnTrue, returnFalse) {
      return (
        this.$store.state.pacientes.data &&
        this.$store.state.pacientes.data[this.$route.params.pid]
        ? (
          this.$store.state.pacientes.data[this.$route.params.pid][prop] === exact
          ? returnTrue : returnFalse
        )
        : undefined
      )
    },
    deletePaciente(id) {
      let data = date.formatDate(this.$store.state.entradas.data[id].created, 'DD/MM/YYYY')
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Borrar la entrada del '+data+'?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('entradas/delete', id)
        this.$q.notify({
          message: 'Borrado!',
          color: 'purple'
        })
      })
    },
  }
}
</script>
