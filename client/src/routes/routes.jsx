import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import SignupOrLogin from '../pages/SignupOrLogin';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <LandingPage />
            },
            {
                path: 'auth',
                element: <SignupOrLogin />
            },
            {
                path: 'home',
                element: <Home />
            }
        ]
    }
])

export default routes;