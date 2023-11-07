import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Signup from "../pages/Signup";
// import useToken from "./useToken";
import './Navbar.css';

const baseUrl = "http://localhost:3000"
// const baseUrl = "https://stockcountbraek.netlify.app"

const LOGOUT_URL = "https://konvergentgroup.com/braek/logout";
// const LOGOUT_URL = "https://redpillsage.com/logout";
// const LOGOUT_URL = "http://127.0.0.1:5000/logout";

function Navbar(props) {

  const navigate = useNavigate();
  // const { token, removeToken, setToken } = useToken();
  // const btnlogin = props.btnlogin;
     
    function logMeOut() {
        axios({
            method: "POST",
            url:LOGOUT_URL,
            // url:"http://127.0stockcountbraek.0.1:5000/logout",
        })
        .then((response) => {
            props.token()
          localStorage.removeItem('email')
          // return to a main page currently
          navigate("/");
          //add due to logout blank screen
          // window.location.href='/'
          window.location.href= baseUrl
          // window.location.href='http://localhost:3000/'
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }
    // detects if email is saved in local storage 
    const logged = localStorage.getItem('email');
     
  return (
      <div className="Navbar">
        <div className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Braek</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href={`${baseUrl}/stockcount`}>Stock Count</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href={`${baseUrl}/shop`}>Shop</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href={`${baseUrl}/additem`} >Add Item</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href={`${baseUrl}/signup`}>Sign Up</a>
                </li>
              </ul>
                {!logged?
                  ''// <button className="btn btn-outline-success" type="submit">Login</button>
                  :<button className="btn btn-outline-danger" type="submit" onClick={logMeOut}>Logout</button>}
            </div>
          </div>
        </div>
      </div>
    )
}
 
export default Navbar;