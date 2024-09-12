// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAiFQznTsUIi5QTPYY1V2RtCdBa8b_wy8k",
    authDomain: "realtime-mouse.firebaseapp.com",
    projectId: "realtime-mouse",
    storageBucket: "realtime-mouse.appspot.com",
    messagingSenderId: "1033701717925",
    appId: "1:1033701717925:web:a561414bba3f73376c9a4c",
    measurementId: "G-BSK40E2JKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const rtdb = getDatabase(app, 'https://realtime-mouse-default-rtdb.europe-west1.firebasedatabase.app/');

export * as Firestore from 'firebase/firestore';
export * as RealtimeDB from 'firebase/database';