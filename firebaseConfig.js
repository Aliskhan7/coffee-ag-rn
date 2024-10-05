import { initializeApp } from 'firebase/app';
import {
    initializeAuth,
    getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
    apiKey: "AIzaSyDWXhKJtpn_Ye9BE8sVYFTw9x_q8DTCB_E",
    authDomain: "coffee-ag.firebaseapp.com",
    projectId: "coffee-ag",
    storageBucket: "coffee-ag.appspot.com",
    messagingSenderId: "322785059048",
    appId: "1:322785059048:web:03e02a695a16c399ad295d",
    measurementId: "G-STDVKNK0PQ"
};
// Инициализация приложения Firebase
const app = initializeApp(firebaseConfig);

// Инициализация аутентификации с использованием AsyncStorage
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Инициализация Firestore
const firestore = getFirestore(app);

export { auth, firestore };
