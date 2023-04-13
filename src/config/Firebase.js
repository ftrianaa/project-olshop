// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBvBPEtbzdheLx3uT3s-aKV2USrcgAcZoA',
  authDomain: 'olshop-olimall.firebaseapp.com',
  projectId: 'olshop-olimall',
  storageBucket: 'olshop-olimall.appspot.com',
  messagingSenderId: '942527138786',
  appId: '1:942527138786:web:54dd88f4141a83a33b47bb',
  measurementId: 'G-E7MWV2F5RV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app)
