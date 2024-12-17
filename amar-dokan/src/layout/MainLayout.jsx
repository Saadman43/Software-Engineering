import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { CartProvider, AddToCart, CartSummary } from '../Components/AddToCart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPanel from "../Components/LoginPanel";
import RegistrationPanel from "../Components/RegistrationPanel";
const MainLayout = () => {
    return (
        <CartProvider>
            <Navbar />
            <Outlet />
            <CartSummary />
            <ToastContainer></ToastContainer>
            <LoginPanel></LoginPanel>
            <RegistrationPanel></RegistrationPanel>
        </CartProvider>
    );
};

export default MainLayout;