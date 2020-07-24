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
      console.log(firebase.apps.length)
      firebase.initializeApp({
        apiKey: "AIzaSyADuqq2PHWwS3N3rvaWMmi0RRksAtJUTf4",
        authDomain: "historia-clinica-cvp.firebaseapp.com",
        databaseURL: "https://historia-clinica-cvp.firebaseio.com",
        projectId: "historia-clinica-cvp",
        storageBucket: "historia-clinica-cvp.appspot.com",
        messagingSenderId: "112706651486",
        appId: "1:112706651486:web:e239cc9250df8f36193bcf",
        measurementId: "G-ED0PFJZCNT"
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
