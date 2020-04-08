import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDvJdONw1rFbMniBSLQVpMSmKorRL_-kew",
  authDomain: "random-rl.firebaseapp.com",
  databaseURL: "https://random-rl.firebaseio.com",
  projectId: "random-rl",
  storageBucket: "random-rl.appspot.com",
  messagingSenderId: "458384989111",
  appId: "1:458384989111:web:5cde9b77a420e21cd7e632",
  measurementId: "G-FSDNKSE5KV"
};

// Initialize Firebase
firebase.initializeApp(config);
//firebase.analytics();

export const dbase = firebase.database();