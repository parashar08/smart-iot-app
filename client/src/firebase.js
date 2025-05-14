import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCPWH1dbGGhn3s2NpjSWz3-tPaWJhwM6Z4",
  authDomain: "smart-iot-app-de64a.firebaseapp.com",
  projectId: "smart-iot-app-de64a",
  storageBucket: "smart-iot-app-de64a.firebasestorage.app",
  messagingSenderId: "389507885507",
  appId: "1:389507885507:web:1b4ded603230013e657576",
  measurementId: "G-MPC4D8PQCN",
  databaseURL: 'https://smart-iot-app-de64a-default-rtdb.firebaseio.com'
};

// initilize firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);