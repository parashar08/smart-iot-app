import { getDatabase, ref, set } from 'firebase/database';
import { app } from './firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Auth from './Auth';

const db = getDatabase(app);
const auth = getAuth(app);

function App() {
  const putData = () => {
    set(ref(db, 'users/info'), {
      id: 1,
      name: 'priyanshu singh',
      age: 21
    })
  }

  const RegisterUser = () => {
    createUserWithEmailAndPassword(auth, 'the69bit@gmail.com', 'pass@123')
      .then(res => console.log(res))
      .catch(error => console.log(`Error code ${error.code} and Error message ${error.message}`))
  }
  return (
    <div className='container'>
      <p>In the app component!</p>
      <button onClick={putData}>send data</button>

      <div>
            <p>In auth section of our application!</p>
            <form >
                <div className='input-container'>
                    <label htmlFor="email"></label>
                    <input type="email" />
                </div>
                <div className='input-container'>
                    <label htmlFor="password"></label>
                    <input type="password" />
                </div>
            </form>

            <button onClick={RegisterUser}>Signup</button>
        </div>

        <Auth />
    </div>
  )
}

export default App;