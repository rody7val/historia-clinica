// ~store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import VuexEasyFirestore from 'vuex-easy-firestore'
Vue.use(Vuex)

import { initialize, firebase, firestore } from '../config/firebase.js'
import clientes from './modules/clientes.js'
import pacientes from './modules/pacientes.js'
import entradas from './modules/entradas.js'

// do the magic 🧙🏻‍♂️
const easyFirestore = VuexEasyFirestore(
  [clientes, pacientes, entradas],
  {logging: true, FirebaseDependency: firebase}
)

const storeData = {
  plugins: [easyFirestore],
  state: {
  	title: 'Historia Clínica',
    subtitleLeft: '',
    subtitleRight: '',
    iconleft: '',
    iconright: '',
    load: true,
    myLocale: {
      /* starting with Sunday */
      days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
      daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
      months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
      monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
      firstDayOfWeek: 1
    }
  },

  mutations: {
    changeTitle (state, title) {
      state.title = title
    },
    changeSubtitleLeft (state, subtitle) {
      state.subtitleLeft = subtitle
    },
    changeSubtitleRight (state, subtitle) {
      state.subtitleRight = subtitle
    },
    changeIconLeft (state, icon) {
      state.iconleft = icon
    },
    changeIconRight (state, icon) {
      state.iconright = icon
    },
    handleDoneClientes(state, id) {
      state.clientes.data[id].done = !state.clientes.data[id].done
    },
    handleDonePacientes(state, id) {
      state.pacientes.data[id].done = !state.pacientes.data[id].done
    },
    handleDoneEntradas(state, id) {
      state.entradas.data[id].done = !state.entradas.data[id].done
    },
    resetClientes (state) {
      state.clientes.data = {}
    },
    resetPacientes (state) {
      state.pacientes.data = {}
    },
    resetEntradas (state) {
      state.entradas.data = {}
    },
  },

  //strict: process.env.DEV
}

// initialise Vuex
const store = new Vuex.Store(storeData)

// init firestore cloud data base
firestore()

export default store
