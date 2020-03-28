import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const firebaseConfig = {
    apiKey: "AIzaSyAefOcy1OlpheKLK_euSttgp9KNvuI3o9k",
    authDomain: "ramdomness-f0a71.firebaseapp.com",
    databaseURL: "https://ramdomness-f0a71.firebaseio.com",
    projectId: "ramdomness-f0a71",
    storageBucket: "ramdomness-f0a71.appspot.com",
    messagingSenderId: "84017888852",
    appId: "1:84017888852:web:52af8b83fb3f64091bb7c1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore()

// date issue fix according to firebase
const settings = {
}
db.settings(settings)


export {
    db
}