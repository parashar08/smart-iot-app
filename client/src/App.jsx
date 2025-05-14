import { getDatabase, ref, set } from 'firebase/database';
import { app } from './firebase';

const db = getDatabase(app);

function App() {
  const putData = () => {
    set(ref(db, 'users/info'), {
      id: 1,
      name: 'priyanshu singh',
      age: 21
    })
  }
  return (
    <div className='container'>
      <p>In the app component!</p>
      <button onClick={putData}>send data</button>
    </div>
  )
}

export default App;