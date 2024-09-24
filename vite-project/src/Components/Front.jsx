import React from 'react';


import fn1 from "../Assets/cart-2.png";
import fn2 from "../Assets/logo.png";
import fn3 from "../Assets/pro-9.png";
import fn4 from "../Assets/pro-2.jpeg";
import fn5 from "../Assets/pro-1.jpeg";
import fn6 from "../Assets/pro-3.jpeg";
import fn7 from "../Assets/exclusive.png";
import bn1 from "../Assets/logo-godrej.png";
import bn2 from "../Assets/logo-oppo.png";
import bn3 from "../Assets/logo-coca-cola.png";
import bn4 from "../Assets/logo-paypal.png";
import bn5 from "../Assets/logo-philips.png";
import ft1 from "../Assets/play-store.png";
import ft2 from "../Assets/app-store.png";
import { Link } from 'react-router-dom';
import "../css/front.css"
import Navbar from './Navbar';




function Front() {
    return (
        <div>
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <h1>Give Your OutFit <br />A New Style!</h1>
                            <p>Playing dress-up begins at age five and never truly ends.</p>
                            {/* <a href="" className="btn">Explore Now &#8594;</a> */}
                            <Link to={'/product'} className='btn' style={{marginTop:"30px"}}>Explore Now &#8594;</Link>
                        </div>
                        <div className="col-2">
                            <img src={fn3}/>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="small-container">
                <h2 className="title">Featured Products</h2>
                {
                    <div className="categories">
                    <div className="small-container">
                        <div className="row">
                            <div className="col-3">
                                <img src={fn4} alt="Category Image" />
                            </div>
                            <div className="col-3">
                                <img src={fn5} alt="Category Image" />
                            </div>
                            <div className="col-3">
                            <img src={fn6} alt="Category Image" />
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
            <h2 className="title">Latest Products</h2>
            {/* Add your latest product cards here */}
            <div className="offer">
                <div className="small-container">
                    <div className="row">
                        <div className="col-2">
                            <img src={fn7} className="offer-img" alt="Exclusive Offer" />
                        </div>
                        <div className="col-2">
                            <p>Exclusively Available on Amar Bazar</p>
                            <h1>Smart Band 4</h1>
                            <small>The Mi Smart Band 4 features a 39.9% large (than Mi Band 3) AMOLED color full-touch display with adjustable brightness, so everything is clear as can be .</small>
                            {/* <a href="" className="btn">Buy Now &#8594;</a> */}
                            <Link to={'/login'} className="btn">Buy Now &#8594;</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="testimonial">
                <div className="small-container">
                    <div className="row">
                        {/* Add your testimonial cards here */}
                    </div>
                </div>
            </div>
            <div className="brands">
                <div className="small-container">
                    <div className="row">
                        <div className="col-5">
                            <img src={bn1} alt="Brand Logo" />
                        </div>
                        <div className="col-5">
                            <img src={bn2} alt="Brand Logo" />
                        </div>
                        <div className="col-5">
                            <img src={bn3} alt="Brand Logo" />
                        </div>
                        <div className="col-5">
                            <img src={bn4} alt="Brand Logo" />
                        </div>
                        <div className="col-5">
                            <img src={bn5} alt="Brand Logo" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="footer-col-1">
                            <h3>Download Our App</h3>
                            <p>Download App for Anroid and ios mobile phone.</p>
                            <div className="app-logo">
                                <img src={ft1} alt="Play Store Logo" />
                                <img src={ft2} alt="App Store Logo" />
                            </div>
                        </div>
                        <div className="footer-col-2">
                            <img src={fn2} alt="Amar Dokan Logo" />
                            <p>Our purpose is to Sustainably Make the Pleasure and Benefits of Sports Accessible to the Many.</p>
                        </div>
                        <div className="footer-col-3">
                            <h3>Useful Links</h3>
                            <ul>
                                <li>Coupons</li>
                                <li>Blog Post</li>
                                <li>Return Policy</li>
                                <li>Join Affiliate</li>
                            </ul>
                        </div>
                        <div className="footer-col-4">
                            <h3>Follow Us</h3>
                            <ul>
                                <li>Facebook</li>
                                <li>Twitter</li>
                                <li>Instagram</li>
                                <li>YouTube</li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <p className="last">&copy; 2024 Online Shopping. All rights reserved.</p>
                    <br />
                    <div className="para">
                        <p> Contact Us:</p>
                        <p>Mobile:01680615009</p>
                        <p>E-mail:amardokan@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Front;


// import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'; // Import BrowserRouter, Route, Switch, and Link
// import Products from '../Components/Product'; // Import your Products component
// import About from '../Components/About'; // Import your About component
// import SignUp from '../Components/Signup'; // Import your SignUp component
// import Login from '../Components/Login'; // Import your Login component
// import fn1 from "../Assets/cart-2.png";
// import fn2 from "../Assets/logo.png";
// import fn3 from "../Assets/pro-9.png";
// import fn4 from "../Assets/pro-2.jpeg";
// import fn5 from "../Assets/pro-1.jpeg";
// import fn6 from "../Assets/pro-3.jpeg";
// import fn7 from "../Assets/exclusive.png";
// import bn1 from "../Assets/logo-godrej.png";
// import bn2 from "../Assets/logo-godrej.png";
// import bn3 from "../Assets/logo-coca-cola.png";
// import bn4 from "../Assets/logo-paypal.png";
// import bn5 from "../Assets/logo-philips.png";
// import ft1 from "../Assets/play-store.png";
// import ft2 from "../Assets/app-store.png";
// import './Front.css';

// function Front() {
//     return (
//         <Router> {/* Wrap your entire component with BrowserRouter */}
//             <div>
//                 <div className="header">
//                     <div className="container">
//                         <div className="navbar">
//                             <div className="logo">
//                                 <img src={fn2} width="125px" alt="Amar Dokan Logo" />
//                             </div>
//                             <nav>
//                                 <ul>
//                                     <li><Link to="/">Home</Link></li> {/* Update Home link */}
//                                     <li><Link to="/products">Products</Link></li> {/* Update Products link */}
//                                     <li><Link to="/about">About</Link></li> {/* Update About link */}
//                                     <li className="dropdown">
//                                         <a href="#" className="dropbtn">Sign Up/Log In</a>
//                                         <div className="dropdown-content">
//                                             <Link to="/signup">Sign Up</Link> {/* Update Sign Up link */}
//                                             <Link to="/login">Log In</Link> {/* Update Log In link */}
//                                         </div>
//                                     </li>
//                                 </ul>
//                             </nav>
//                             <img src={fn1} width="30px" height="30" alt="Shopping Cart" />
//                         </div>
//                         <div className="row">
//                             <div className="col-2">
//                                 <h1>Give Your OutFit <br />A New Style!</h1>
//                                 <p>Playing dress-up begins at age five and never truly ends.</p>
//                                 <Link to="/" className="btn">Explore Now &#8594;</Link> {/* Update Explore Now button */}
//                             </div>
//                             <div className="col-2">
//                                 <img src={fn3} alt="Outfit Image" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="categories">
//                     <div className="small-container">
//                         <div className="row">
//                             <div className="col-3">
//                                 <img src={fn4} alt="Category Image" />
//                             </div>
//                             <div className="col-3">
//                                 <img src={fn5} alt="Category Image" />
//                             </div>
//                             <div className="col-3">
//                             <img src={fn6} alt="Category Image" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="small-container">
//                     <h2 className="title">Featured Products</h2>
//                     {/* Add your product cards here */}
//                 </div>
//                 <h2 className="title">Latest Products</h2>
//                 {/* Add your latest product cards here */}
//                 <div className="offer">
//                     <div className="small-container">
//                         <div className="row">
//                             <div className="col-2">
//                                 <img src={fn7} className="offer-img" alt="Exclusive Offer" />
//                             </div>
//                             <div className="col-2">
//                                 <p>Exclusively Available on Amar Bazar</p>
//                                 <h1>Smart Band 4</h1>
//                                 <small>The Mi Smart Band 4 features a 39.9% large (than Mi Band 3) AMOLED color full-touch display with adjustable brightness, so everything is clear as can be .</small>
//                                 <Link to="/" className="btn">Buy Now &#8594;</Link> {/* Update Buy Now button */}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="testimonial">
//                     <div className="small-container">
//                         <div className="row">
//                             {/* Add your testimonial cards here */}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="brands">
//                     <div className="small-container">
//                         <div className="row">
//                             <div className="col-5">
//                                 <img src={bn1} alt="Brand Logo" />
//                             </div>
//                             <div className="col-5">
//                                 <img src={bn2} alt="Brand Logo" />
//                             </div>
//                             <div className="col-5">
//                                 <img src={bn3} alt="Brand Logo" />
//                             </div>
//                             <div className="col-5">
//                                 <img src={bn4} alt="Brand Logo" />
//                             </div>
//                             <div className="col-5">
//                                 <img src={bn5} alt="Brand Logo" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="footer">
//                     <div className="container">
//                         <div className="row">
//                             <div className="footer-col-1">
//                                 <h3>Download Our App</h3>
//                                 <p>Download App for Anroid and ios mobile phone.</p>
//                                 <div className="app-logo">
//                                     <img src={ft1} alt="Play Store Logo" />
//                                     <img src={ft2} alt="App Store Logo" />
//                                 </div>
//                             </div>
//                             <div className="footer-col-2">
//                                 <img src={fn2} alt="Amar Dokan Logo" />
//                                 <p>Our purpose is to Sustainably Make the Pleasure and Benefits of Sports Accessible to the Many.</p>
//                             </div>
//                             <div className="footer-col-3">
//                                 <h3>Useful Links</h3>
//                                 <ul>
//                                     <li>Coupons</li>
//                                     <li>Blog Post</li>
//                                     <li>Return Policy</li>
//                                     <li>Join Affiliate</li>
//                                 </ul>
//                             </div>
//                             <div className="footer-col-4">
//                                 <h3>Follow Us</h3>
//                                 <ul>
//                                     <li>Facebook</li>
//                                     <li>Twitter</li>
//                                     <li>Instagram</li>
//                                     <li>YouTube</li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <hr />
//                         <p className="last">&copy; 2024 Online Shopping. All rights reserved.</p>
//                         <br />
//                         <div className="para">
//                             <p> Contact Us:</p>
//                             <p>Mobile:01680615009</p>
//                             <p>E-mail:amardokan@gmail.com</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* Define routes for your components */}
//             <Switch>
//                 <Route path="/product" component={Products} />
//                 <Route path="/about" component={About} />
//                 <Route path="/signup" component={SignUp} />
//                 <Route path="/login" component={Login} />
//             </Switch>
//         </Router>
//     );
// }

// export default Front;
