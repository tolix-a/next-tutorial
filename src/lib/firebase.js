// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyCoTKuB6a_WP8SAIbPFQAsFpO4OhkHs2mk",
  authDomain: "test-713fd.firebaseapp.com",
  projectId: "test-713fd",
  storageBucket: "test-713fd.appspot.com",
  messagingSenderId: "89621795509",
  appId: "1:89621795509:web:3df36f1d6fda5b370564fc",
  measurementId: "G-Y9TVB6XNLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);



let messaging;

if(typeof window !=="undefined" && typeof window.navigator  !== 'undefined'){
  messaging = getMessaging();
}

export const getClientToken = async ()=>{
  const key = 'BKTQzWvoxDZ8mk2_zOfva8EjxOI22FPY-NGQX7RrOXpy2JZvz3uaA1SKi3i5Kh2rhYBUVGM5qT5NAa8Gi1vsBC4';
  const currentToken = await getToken(messaging, { vapidKey: key })
  return currentToken;
}