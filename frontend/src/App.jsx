import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
   
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddItem from './pages/AddItem';
import Login from './components/Login'
import useToken from './components/useToken'
import Signup from './pages/Signup';
import SharedLayout from './components/SharedLayout';
import StockCount from './pages/StockCount';
import ProtectedRoutes from './components/ProtectedRoutes';
import Users from './pages/Users';
import Shop from './pages/Shop';

function App() {
     
  const { token, setToken } = useToken();
  
    return (
        <div className="vh-100 gradient-custom">
          <div className="container">
            <h2 className="page-header text-center">Stock Count</h2>
              
              {/* <Header token={removeToken} /> */}
                {/* {!token && token!=="" && token!== undefined?   */}
                {/* <> */}
                  {/* <Login setToken={setToken}/> */}
                  {/* <Signup/> */}
              {/* </> */}
              {/* :( */}
              {/* <> */}
            <BrowserRouter>
                <Routes>
                  <Route path='/' element={<SharedLayout />}>
                    <Route index element={<Login setToken={setToken}/>}></Route>
                    <Route path='/signup' element={<Signup />}></Route>
                    <Route element={<ProtectedRoutes token={token} setToken={setToken}/>}>
                      <Route path='/stockcount' element={<StockCount />}></Route>
                      <Route path='/additem' element={<AddItem />}></Route>
                      <Route path='/users' element={<Users />}></Route>
                      <Route path='/shop' element={<Shop />}></Route>
                    </Route>
                  </Route>
                </Routes>
                  
              {/* </> */}
            {/* ) */}
            {/* } */}
          </BrowserRouter>
          <br/>
          </div>
        </div>
    );
}
     
export default App;
