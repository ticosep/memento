import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

// Export all the need references to the firebase
const config = {
    apiKey: "AIzaSyBpZOq7d6dCnbTkadvh1Sy8IgWUGGE7GiE",
    authDomain: "memento-7e2ff.firebaseapp.com",
    databaseURL: "https://memento-7e2ff.firebaseio.com",
    projectId: "memento-7e2ff",
    storageBucket: "memento-7e2ff.appspot.com",
    messagingSenderId: "411058854398"

};

const app = firebase.initializeApp(config);
const database = app.database();
const storageRef = app.storage().ref();


export  { app, database, storageRef };