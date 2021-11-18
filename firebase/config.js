import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCS9619pnoIPyrZOd71wleW0yLb7YqKjII",
    authDomain: "grubber-4a87a.firebaseapp.com",
    databaseURL: "https://grubber-4a87a-default-rtdb.firebaseio.com",
    projectId: "grubber-4a87a",
    storageBucket: "grubber-4a87a.appspot.com",
    messagingSenderId: "451766757997",
    appId: "1:451766757997:web:060d4f1ee34a492ab56d64",
    measurementId: "G-FHEB3MJM04"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };