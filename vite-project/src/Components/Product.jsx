



// import React from 'react';
import productStyle from './Product.module.css';
import pd1 from "../Assets/pro-1.jpeg";
import pd2 from "../Assets/pro-2.jpeg";
import pd3 from "../Assets/pro-3.jpeg";
import pd4 from "../Assets/pro-1.jpeg";
import pd5 from "../Assets/product-12.jpg"
import pd6 from "../Assets/product-6.jpg"
import pd7 from "../Assets/product-10.jpg"
import pdw1 from "../Assets/category-3.jpg"
import pdw2 from "../Assets/new3.jpeg"
import pdw3 from "../Assets/new2.jpeg"
import pdw4 from "../Assets/new.jpeg"
import pdw5 from "../Assets/new5.jpeg"
import pdk1 from "../Assets/WhatsApp Image 2024-02-12 at 23.13.35.jpeg"
import pdk2 from "../Assets/WhatsApp Image 2024-02-12 at 23.13.34.jpeg"
import SingleProduct from './SingleProduct.jsx'
import { useEffect, useState } from 'react';
import axios from 'axios'
function Product() {
    const [products, setProducts] = useState();
    useEffect(()=>{
        axios.get('https://dummyjson.com/products').then(res=>setProducts(res.data.products))
    }, [])



    return (
        <div id='product' className={productStyle["small-container"]}>
            {/* MEN'S SECTION */}
            <h2 className={productStyle.title}>Latest Product</h2>
            <div className="row">
               {products && products.map(product=><SingleProduct key={product.id} name={product.title} price={product.price} img={product.thumbnail}/>)}
            </div>
        </div>
    );
}

export default Product;
