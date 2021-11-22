import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAeI06Aho0bBUTWeLxCP46Ygt6XwH9smEw',
  authDomain: 'grubber-4a87a.firebaseapp.com',
  databaseURL: 'https://grubber-4a87a.firebaseio.com',
  projectId: 'grubber-4a87a',
  storageBucket: 'grubber-4a87a.appspot.com',
  messagingSenderId: '451766757997',
  appId: '1:451766757997:android:47b7c66cc83be2b7b56d64',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };