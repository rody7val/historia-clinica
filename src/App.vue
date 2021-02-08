<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { firebase } from './config/firebase.js'

export default {
  name: 'App',
  created() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
      })
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Playball&family=Source+Code+Pro&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');
  
  *{transition: all 0.3s;}
  
  .z-0 { z-index: 0 }
  .z-1 { z-index: 1 }

  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance:textfield;
  }
body {
    color: #222;
    font-family: 'Roboto',sans-serif;
    font-size: 15px;
    line-height: 1.4;
    direction: ltr;
}
</style>
