// ~store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import VuexEasyFirestore from 'vuex-easy-firestore'
Vue.use(Vuex)

// import from step 1
import { Firebase, initFirebase } from '../config/firebase.js'
// import from step 3 (below)
import clientes from './modules/clientes.js'

// do the magic 🧙🏻‍♂️
const easyFirestore = VuexEasyFirestore(
  [clientes],
  {logging: true, FirebaseDependency: Firebase}
)

// include as PLUGIN in your vuex store
// please note that "myModule" should ONLY be passed via the plugin
const storeData = {
  plugins: [easyFirestore],
  state:{
  	title: "Historia Clínica",
  },
  strict: process.env.DEV
  // ... your other store data
}

// initialise Vuex
const store = new Vuex.Store(storeData)

// initFirebase
initFirebase()
  .catch(error => {
    // take user to a page stating an error occurred
    // (might be a connection error, or the app is open in another tab)
  })

export default store
