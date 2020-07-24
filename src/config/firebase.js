// ~config/firebase.js
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage';

function firestore () {
  return new Promise((resolve, reject) => {
    firebase.firestore().enablePersistence()
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
      .finally(console.log("Firebase Enable Persistence"))
  })
}

function storage(file, ref, cb) {
  return new Promise((resolve, reject) => {
    let uploadTask = firebase.storage().ref().child(ref).put(file);
    uploadTask.on(
      "state_changed", snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done')
      }, error => {
        reject(error)
      },() => {
        uploadTask.snapshot.ref
        .getDownloadURL()
        .then((downloadURL) => {
          console.log("Uploaded a blob or file!");
          console.log("got downloadURL: ", downloadURL);
          cb(downloadURL)
          resolve(downloadURL);
        });
      }
    );
  });
}

export {
  firebase,
  firestore,
  storage,
}
