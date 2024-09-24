import React from 'react'
import fn2 from "../Assets/logo.png";
import fn1 from "../Assets/cart-2.png";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={fn2} width="125px" alt="Amar Dokan Logo" />
            </div>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/product'>Products</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    {/* <li><a href="#product">Products</a></li> */}
                    {/* <Link to='/product'>Products</Link> */}
                    {/* <li><a href="#about">About</a></li> */}
                    {/* <Link to={'/about'}>    About</Link> */}
                    <li className="dropdown">
                        <Link to={'/signup'} className='btn'>Sign Up</Link>
                        {/* <a href="#signup" className="dropbtn">Sign Up/Log In</a> */}
                        <div className="dropdown-content">
                            {/* <a href="#">Sign Up</a> */}
                            {/* <Link to={'/signup'}>Sign Up</Link> */}
                            {/* <a href="#">Log In</a> */}
                            {/* <Link to={'/login'}>Log In</Link> */}
                        </div>
                    </li>
                </ul>
            </nav>
            <img src={fn1} width="30px" height="30" alt="Shopping Cart" />
        </div>
    )
}

export default Navbar