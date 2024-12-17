import React from 'react';
import banner from "../Assets/pro-9.png";
import fn2 from "../Assets/logo.png";
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

function Front() {
    return (
        <div>
            <div className='bannerContainer'>
                <div className='container'>
                    <div className="row ">
                        <div className="col-2">
                            <h1>Give Your OutFit <br />A New Style!</h1>
                            <p>Playing dress-up begins at age five and never truly ends.</p>
                            <div className='py-2 mt-4'><Link to='/products' className="btn">Explore Now &#8594;</Link></div>
                        </div>
                        <div className="col-2">
                            <img src={banner} />
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
