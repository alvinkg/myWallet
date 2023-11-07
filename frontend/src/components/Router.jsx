
// import Login from './Login'
import Header from "./Header";
import Footer from "./Footer";
import useToken from './useToken'


import Signup from '../pages/Signup';
import Error from '../pages/Error';
import Users from '../pages/Users';

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";


const Router = () => {
    const Layout = () => {
        
        return (
            <>
                {/* <Header/> */}
                {/* <Outlet/> */}
                {/* <Footer/> */}
            </>
        )
    }

    const BrowserRoutes = () => {
        const { token, removeToken, setToken } = useToken();

        return (
            <BrowserRouter>
                <Routes>
                    {/* <Route path='/' element={<Layout/>} > */}
                        {/* <Route index element={<Shop/>}/> */}
                        {/* <Route path='about' element={<Profile/>} /> */}
                        {/* <Route path='products' element={<Wallet/>} /> */}
                        {/* <Route path='users' element={<Users/>} /> */}
                        {/* <Route path='products' element={<Signup/>} /> */}
                        {/* <Route path='*' element={<Error />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    return (
        <BrowserRoutes/>
    )
}

export default Router