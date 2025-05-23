import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase } from 'firebase/database'

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyALKUc59AoFhIGv1sX_FSiPKPbNgZxXcBA",
  authDomain: "smart-iot-app-e8912.firebaseapp.com",
  projectId: "smart-iot-app-e8912",
  storageBucket: "smart-iot-app-e8912.firebasestorage.app",
  messagingSenderId: "997682192365",
  appId: "1:997682192365:web:8395369fbd451298f051e4",
  measurementId: "G-JKFYFCJX6V",
  databaseURL: 'https://smart-iot-app-e8912-default-rtdb.firebaseio.com'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider(app);
const database = getDatabase(app);


export const FirebaseProvider = ({ children }) => {
    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signupWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const loginWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signupWithGoogle, loginWithEmailAndPassword,  }}>
            {children}
        </FirebaseContext.Provider>
    )
}

export const useFirebase = () => {
    return useContext(FirebaseContext);
}