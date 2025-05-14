import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";

const Auth = () => {
    const auth = getAuth(app);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(response => console.log(response))
            .catch((error) => {
                const code = error.code;
                const message = error.message;
                console.log(`Error with code ${code} and message ${message}`)
            })
    }

    return (
        <div>
            <h1>Login User!</h1>
            <form action="">
                <div className="input-box">
                    <label htmlFor="email">Email: </label>
                    <input type="email" onChange={e => setEmail(e.target.value)} value={email}/>
                </div>
                <div className="input-box">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password}/>
                </div>
            </form>

            <button onClick={loginUser}>Login User</button>
        </div>
    )
}

export default Auth;