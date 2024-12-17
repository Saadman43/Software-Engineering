import React from 'react'
import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { User, Search, ShoppingCart, } from 'lucide-react';
import { useCart } from './AddToCart';
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const navigate = useNavigate();
    const { setRightPanelVisibility } = useCart();
    const token = localStorage.getItem('accessToken');
    let loginInfo = null;
    if (token) {
        loginInfo = jwtDecode(token);
    }
    const logout = () => {
        localStorage.removeItem("accessToken")
        navigate("/");
    }
    return (
        <div className="header">
            <div className="container">
                <div className="navbar">
                    <div className="logo">
                        <Link to="/"><img src={logo} width="125px" /></Link>
                    </div>
                    <nav className="navbar">
                        <div className="logo">
                            <a href="#"></a>
                        </div>
                        <ul className="nav-links">
                            <li className="dropdown">
                                <a href="#" className="dropbtn" >MEN</a>
                                <div className="dropdown-content">
                                    <Link to="/products?subCategory=Shirt">Shirt</Link>
                                    <Link to="/products?subCategory=Pant">Pant</Link>
                                    <Link to="/products?subCategory=Polo">Polo</Link>
                                    <Link to="/products?subCategory=T-shirt">T-shirt</Link>
                                    <Link to="/products?subCategory=Hoodies">Hoodies</Link>
                                </div>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropbtn" >WOMEN</a>
                                <div className="dropdown-content">
                                    <Link to="/products?subCategory=Tops">Tops</Link>
                                    <Link to="/products?subCategory=Bottom">Bottom</Link>
                                </div>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropbtn" >KIDS</a>
                                <div className="dropdown-content">
                                    <Link to="/products?subCategory=Kids-boy">Boys</Link>
                                    <Link to="/products?subCategory=Kids-girl">Girls</Link>
                                </div>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropbtn" >OTHERS</a>
                                <div className="dropdown-content">
                                    <Link to="/products?subCategory=Outerwear">Outerwear</Link>
                                    <Link to="/products?subCategory=Activewear">Activewear</Link>
                                    <Link to="/products?subCategory=Accessories">Accessories</Link>
                                </div>
                            </li>
                        </ul>

                    </nav>
                    <ul className="icons d-flex align-items-center">
                        <li className='cursorPointer me-2' onClick={() => setRightPanelVisibility('shoppingCart')}><ShoppingCart className="mr-2" size={20} /></li>
                        <li className='cursorPointer dropdown' id="toggle-button">
                            <a href="#" className="dropbtn" ><User className="dropbtn" size={20} /></a>
                            <div className="dropdown-content loginDropdown">
                                <div className='px-2 py-2'>
                                    {loginInfo ? (
                                        <div>
                                            <div className='py-2'>
                                                <Link className='userName' to="/profile">{loginInfo.sub}</Link>
                                                <Link className='userName' to="/orderList">Orders</Link>
                                            </div>
                                            <span onClick={logout}>Logout</span>
                                        </div>
                                    ) : <span onClick={() => setRightPanelVisibility('loginPanel')}>Login</span>}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Navbar