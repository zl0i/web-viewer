import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDsNtWhBpB9YjNzW4fmBjSh2VwjEX13xTk",
    authDomain: "armybots-18db9.firebaseapp.com",
    projectId: "armybots-18db9",
    storageBucket: "armybots-18db9.appspot.com",
    messagingSenderId: "441414543651",
    appId: "1:441414543651:web:6e435555614de085714496",
    measurementId: "G-EQK1DQHKHM"
};

export const firebaseApp = initializeApp(firebaseConfig);
