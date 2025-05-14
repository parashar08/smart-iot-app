import { useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

export const checkAuth = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const { isAuth } = useFirebase();
        if (isAuth) {
            navigate('/home');
        } else {
            navigate('/auth');
        }
    }, [])
}