import firebase from 'firebase/compat/app'; 
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDaJ1dcOZSR7kC0L7zwHO5az-pYq9Bny2g",
    authDomain: "y-facebook.firebaseapp.com",
    projectId: "y-facebook",
    storageBucket: "y-facebook.appspot.com",
    messagingSenderId: "1018861587670",
    appId: "1:1018861587670:web:61f3a98489a1d674424d77"
};

const app = firebase.initializeApp(firebaseConfig)
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage, app};