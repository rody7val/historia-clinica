// ~config/firebase.js
import * as Firebase from 'firebase/app'
import 'firebase/firestore'

function initFirebase () {
  Firebase.initializeApp({
    // your config 
  })
  return new Promise((resolve, reject) => {
    Firebase.firestore().enablePersistence()
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
          reject(err)
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          reject(err)
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
      .finally(console.log("yea"))
  })
}

export { Firebase, initFirebase }
