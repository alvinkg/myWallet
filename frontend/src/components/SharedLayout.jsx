import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import useToken from "./useToken";

const SharedLayout = () => {

  const { removeToken } = useToken();
  return (
    <>
        <Navbar token={removeToken}/>
        <Outlet />
    </>
  );
};
export default SharedLayout;