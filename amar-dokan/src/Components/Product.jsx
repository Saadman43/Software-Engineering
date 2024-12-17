import productStyle from './Product.module.css';
import SingleProduct from './SingleProduct.jsx'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Product() {
    const [products, setProducts] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const subcategory = searchParams.get("subCategory");
    useEffect(() => {
        console.log()
        fetch('http://127.0.0.1:8000/products' + window.location.search, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
    }, [subcategory])

    const categories = products ? products.filter((p, index, self) =>
        index === self.findIndex((t) => t.category === p.category)
    ) : [];

    return (
        <div id='product' className={productStyle["small-container"]}>
            {categories && categories.map((c, ci) => {
                const productsOfCurrentCategory = products.filter(p => p.category == c.category);
                return (
                    <div key={ci}>
                        <h2 className={productStyle.uppercase + " " + productStyle.title}><div>{c.category} Section</div></h2>
                        <div className="row">
                            {productsOfCurrentCategory && productsOfCurrentCategory.map(product => <SingleProduct key={product.id} product={product} />)}
                        </div>
                    </div>
                )
            }
            )}

        </div>
    );
}

export default Product;
