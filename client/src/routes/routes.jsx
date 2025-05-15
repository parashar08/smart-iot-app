import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import SignupOrLogin from '../pages/SignupOrLogin';
import Dashboard from "../pages/Dashboard";

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
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            }
        ]
    }
])

export default routes;