import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';


const useAuth = () => {
    

       const user = { loggedIn: true }

    return user && user.loginIn;
};

const ProtectedRoutes = () => {
    const token = localStorage.getItem('token');
    console.log('token:', token);
    return (
        token ?<Outlet />: <Navigate to="/"/>
    )
};

export default ProtectedRoutes;