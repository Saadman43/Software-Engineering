import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Front from "../Components/Front";
import Signup from "../Components/Signup";
import Login from "../Components/Login";
import Product from "../Components/Product";
import About from "../Components/About";
import Otp from "../Components/Otp";
import { Profile } from "../Components/Profile";
import '../css/front.css'
import ProductList from "../Components/ProductList";
import OrderList from "../Components/OrderList";
import OrderDetails from "../Components/OrderDetails";

const MainRoute = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Front />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/products",
                element: <Product />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/otp",
                element: <Otp />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/productList",
                element: <ProductList />
            },
            {
                path: "/orderList",
                element: <OrderList />
            },
            {
                path: "/orderDetails",
                element: <OrderDetails/>
            }
        ]
    }
])


export default MainRoute;