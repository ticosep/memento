import "firebase/database";
import "firebase/storage";
import "firebase/auth";

import firebase from "firebase/app";

// Export all the need references to the firebase
const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
};

const app = firebase.initializeApp(config);
const database = app.database();
const storageRef = app.storage().ref();

export { app, database, storageRef };
