import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDHNg0CaDrIISyv72eshUDMHFxZeNx4W14',
  authDomain: 'olimall.firebaseapp.com',
  projectId: 'olimall',
  storageBucket: 'olimall.appspot.com',
  messagingSenderId: '238425027055',
  appId: '1:238425027055:web:2472bc6ade1600d88e861a',
  measurementId: 'G-9EMRRHT7R0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyBvBPEtbzdheLx3uT3s-aKV2USrcgAcZoA',
//   authDomain: 'olshop-olimall.firebaseapp.com',
//   projectId: 'olshop-olimall',
//   storageBucket: 'olshop-olimall.appspot.com',
//   messagingSenderId: '942527138786',
//   appId: '1:942527138786:web:54dd88f4141a83a33b47bb',
//   measurementId: 'G-E7MWV2F5RV',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

// // Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

// export const db = getFirestore(app)
