<template>
  <q-page class="column">
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
    <q-list bordered padding>
      <q-item-label header>Descripción</q-item-label>
      <q-item>
        <q-item-section>
          <q-item-label>{{fecha}}</q-item-label>
          <q-item-label class="text-body1 q-py-sm">{{desc}}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-btn
            @click="fileUpload = !fileUpload"
            :title="fileUpload ? 'Cancelar' : 'Subir Archivo'"
            :icon="fileUpload ? 'fa fa-window-close' : 'fa fa-image'"
            color="primary"
            flat
            round />
        </q-item-section>
      </q-item>
      <q-item v-if="fileUpload">
        <q-file
          v-model="file"
          color="primary"
          filled
          label="Subir archivo">
          <template v-slot:append>
            <q-btn
              v-if="file"
              @click.stop="onChangeImage"
              color="primary"
              round
              flat
              icon="cloud_upload" />
          </template>
        </q-file>
      </q-item>
      <q-linear-progress v-if="$store.state.progress" :value="$store.state.progress" class="q-mt-md" />
      <q-separator spaced />
      <q-item-label header>Archivos</q-item-label>
      <!--<q-item-label v-if="Object.keys($store.state.entradas.data[$route.params.eid].files).lenght" caption class="q-px-md">Sin archivos...</q-item-label>-->
      
      <q-item
        v-for="(item, key) in $store.state.entradas.data[$route.params.eid].files"
        :key="key">
        <q-item-section top thumbnail class="q-ml-none">
          <img :src="item.img">
        </q-item-section>

        <q-item-section>
          <q-item-label class="ellipsis">{{item.name}}</q-item-label>
          <q-item-label caption>{{Number(item.size / 1000).toFixed(0)}} KB</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-btn
            @click="viewImage(item)"
            flat
            round
            color="primary"
            icon="visibility" />
        </q-item-section>

      </q-item>

    </q-list>
        <q-dialog
          v-model="alert"
          persistent
          maximized
          transition-show="slide-up"
          transition-hide="slide-down">
          <q-card>
            <q-card-section class="q-pt-none">
              <q-img
              :src="itemView.img"
              class="responsive"
              style="height:100%"
              >
                <div class="absolute-bottom text-subtitle1 text-center">
                  {{Number(itemView.size / 1000).toFixed(0)}} KB
                </div>
              </q-img>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { firebase, firestore, storage } from '../config/firebase.js'

export default {
  name: 'entrada',

  data(){
    return {
      alert: null,
      fileUpload: false,
      uploadValue: 0,
      file: null,
      itemView: {}
    }
  },

  mounted() {
    // get entrada.id
    this.$store.dispatch('entradas/fetchById', this.$route.params.eid)
    .then(() => {
      // get paciente by id and set props
      this.$store.dispatch('pacientes/fetchById', this.$route.params.pid)
    })
  },

  computed: {
  	desc() {
  		return this.waitParams(this.$store.state.entradas.data, this.$route.params, 'eid', 'desc')
  	},
  	fecha() {
  		let created = this.waitParams(this.$store.state.entradas.data, this.$route.params, 'eid', 'created')
  		return this.datear(created)
  	},
    getPacienteName() {
      return this.$store.state.pacientes.data &&
        this.$store.state.pacientes.data[this.$route.params.pid]
        ? this.$store.state.pacientes.data[this.$route.params.pid].name
        : "cargando..."
    },
    getPacienteType() {
      return (
        this.$store.state.pacientes.data &&
        this.$store.state.pacientes.data[this.$route.params.pid]
        ? (
          this.$store.state.pacientes.data[this.$route.params.pid].dog === "Perro"
          ? "Perro" : "Gato"
        )
        : undefined
      )
    },
    getPacienteIconType() {
      return (
        this.$store.state.pacientes.data &&
        this.$store.state.pacientes.data[this.$route.params.pid]
        ? (
          this.$store.state.pacientes.data[this.$route.params.pid].dog === "Perro"
          ? "la la-dog" : "la la-cat"
        )
        : undefined
      )
    },
    getPacienteFeme() {
      return (
        this.$store.state.pacientes.data &&
        this.$store.state.pacientes.data[this.$route.params.pid]
        ? (
          this.$store.state.pacientes.data[this.$route.params.pid].feme === "Hembra"
          ? "Hembra" : "Macho"
        )
        : undefined
      )
    },
    getPacienteIconFeme() {
      return (
        this.$store.state.pacientes.data &&
        this.$store.state.pacientes.data[this.$route.params.pid]
        ? (
          this.$store.state.pacientes.data[this.$route.params.pid].feme === "Hembra"
          ? "la la-venus" : "la la-mars"
        )
        : undefined
      )
    }
  },

  methods: {
    viewImage(item) {
      this.alert = !this.alert
      this.itemView = item
    },
    // esperar carga
  	waitParams(objStore, params, idParams, props) {
			if (// si hay entradas y parametros
				Object.keys(objStore).length && 
				Object.keys(params).length
			) {// listo para formatear (datear(), etc)
  			return objStore[
  		    params[idParams]
  		  ][props]
			}// sino
			return 'cargando..'
  	},
    datear(data) {
      return date.formatDate(data, 'DD/MM/YYYY')
    },
    onChangeImage () {
      let name = this.file.name
      let size = this.file.size
      let type = this.file.type
      let eid = this.$route.params.eid
      let fileName = `${Date.now()}${this.file.name.match(/\.\w*/ig)}`
      let ref = `img/${eid}/${fileName}`
      let done = false
      let files = this.$store.state.entradas.data[this.$route.params.eid].files
      // subir imagen
      storage(this.file, ref, this.$store.commit, (img) => {
        //guardar archivo en entradas[id].files
        files = files.concat({ name, size, type, eid, fileName, ref, img, done })
        this.$store.dispatch('entradas/patch', { id: eid, files })
      })
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
  }

}
</script>
