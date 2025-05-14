import { Outlet } from "react-router-dom";
import { FirebaseProvider } from "./context/Firebase";

function App() {
  return (
    <>
      <FirebaseProvider>
        <Outlet />
      </FirebaseProvider>
    </>
  )
}

export default App
