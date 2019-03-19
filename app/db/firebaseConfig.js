import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDFLOjja8R5vmI4H0q0cDe0MKpHsi7JnP8",
  authDomain: "reactnative-movielookup.firebaseapp.com",
  databaseURL: "https://reactnative-movielookup.firebaseio.com",
  projectId: "reactnative-movielookup",
  storageBucket: "reactnative-movielookup.appspot.com",
  messagingSenderId: "624517836410",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
};

let app = firebase.initializeApp(config);
export const db = app.database();
