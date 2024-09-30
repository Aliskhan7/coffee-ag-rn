import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDWXhKJtpn_Ye9BE8sVYFTw9x_q8DTCB_E",
    authDomain: "coffee-ag.firebaseapp.com",
    projectId: "coffee-ag",
    storageBucket: "coffee-ag.appspot.com",
    messagingSenderId: "322785059048",
    appId: "1:322785059048:web:03e02a695a16c399ad295d",
    measurementId: "G-STDVKNK0PQ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
