import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

  var firebaseConfig = {
    apiKey: "AIzaSyCfEAVJRO1wyzVqwFxLWATV002_901zL8s",
    authDomain: "photo-app-739ed.firebaseapp.com",
    projectId: "photo-app-739ed",
    storageBucket: "photo-app-739ed.appspot.com",
    messagingSenderId: "820570707342",
    appId: "1:820570707342:web:b98a7d5a0d7cc8c74500df",
    measurementId: "G-0BN7HJ2KFF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  const store = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
//   firebase.analytics();
export {
    storage, store, timestamp
}