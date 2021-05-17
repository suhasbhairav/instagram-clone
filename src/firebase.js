import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAy63lt8Wn0pmdPHZHyFlb6r-LMRmHmehU",
    authDomain: "instagram-clone-5588e.firebaseapp.com",
    projectId: "instagram-clone-5588e",
    storageBucket: "instagram-clone-5588e.appspot.com",
    messagingSenderId: "189639756996",
    appId: "1:189639756996:web:a5580685678e0cbd7b8d91"

});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
