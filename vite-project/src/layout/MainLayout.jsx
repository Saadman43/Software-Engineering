import { Outlet } from "react-router-dom";
import fn2 from "../Assets/logo.png";
import fn1 from "../Assets/cart-2.png";
import fn3 from "../Assets/pro-9.png";

import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
const MainLayout = () => {

    return (
        <div>
            <Navbar/>
            <Outlet />
        </div>
    );
};

export default MainLayout;