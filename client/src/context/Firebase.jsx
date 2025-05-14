import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth'

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyALKUc59AoFhIGv1sX_FSiPKPbNgZxXcBA",
  authDomain: "smart-iot-app-e8912.firebaseapp.com",
  projectId: "smart-iot-app-e8912",
  storageBucket: "smart-iot-app-e8912.firebasestorage.app",
  messagingSenderId: "997682192365",
  appId: "1:997682192365:web:8395369fbd451298f051e4",
  measurementId: "G-JKFYFCJX6V"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider(app);


export const FirebaseProvider = ({ children }) => {
    const signupUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signupWithGoolge = () => {
        signInWithPopup(auth, googleProvider);
    }

    const loginWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const isAuth = () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log(user);
                return true;
            } else {
                console.log('no user found.');
                return false
            }
        })
    }
    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signupWithGoolge, isAuth, loginWithEmailAndPassword }}>
            {children}
        </FirebaseContext.Provider>
    )
}

export const useFirebase = () => {
    return useContext(FirebaseContext);
}