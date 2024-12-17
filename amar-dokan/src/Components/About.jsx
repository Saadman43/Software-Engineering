// import React from 'react';
import AboutStyle from './About.module.css'; // Import the CSS file
import ab1 from "../Assets/category-3.jpg"

const About = () => {
  return (
    <div id='about' className={AboutStyle.container}>
      <div className={AboutStyle.heading}>
        <h1>About Us</h1>
        <p>
          Welcome to Amar Dokan - Your Ultimate Destination for Online Shopping!
          <br />
          At Amar Dokan, we redefine the way you shop online by offering a seamless
          and enjoyable experience.
        </p>
      </div>
      <div className={AboutStyle.about}>
        <section className={AboutStyle["about-content"]}>
          <h2>Your Ultimate Destination for Online Shopping!</h2>
          <p>
            As avid online shoppers ourselves, we understand the importance of
            convenience, variety, and trust when it comes to making your
            purchases.
            <br />
            Our mission is to curate a diverse selection of high-quality products
            across various categories, ensuring there is something for everyone.
            From the latest fashion trends to cutting-edge electronics, home
            essentials, and beyond, we strive to be your go-to destination for
            all your online shopping needs.
            <br />
            What sets us apart is our commitment to customer satisfaction. We
            prioritize transparency, providing detailed product descriptions,
            honest reviews, and a user-friendly interface to enhance your
            shopping journey. Our secure payment gateways and reliable delivery
            services aim to give you peace of mind from checkout to doorstep.
            <br />
            At Amar Dokan, we are not just an online marketplace - we are a
            community. Connect with like-minded shoppers, stay informed about
            upcoming sales and promotions, and embark on a delightful shopping
            experience that goes beyond the transaction.
            <br />
            Join us in navigating the world of online shopping with confidence
            and style. Thank you for choosing Amar Dokan as your trusted
            partner in the exciting realm of e-commerce!
          </p>
          <a href="" className="read-more">Read More</a>
        </section>
        <div className={AboutStyle["about-img"]}>
          <img src={ab1} alt="About Us" />
        </div>
      </div>
    </div>
  );
};

export default About;