import productStyle from './Product.module.css';
import { AddToCart } from './AddToCart';
function SingleProduct({ product }) {
    const { name, price, image, subCategory } = product;
    return (
        <div className={productStyle["col-4"]}>
            <img className={productStyle.productImage} src={image} alt={name} />
            <h4>{name}</h4>
            <p>{price} &#x09F3;</p>
            <AddToCart product={product} />
            {/* <button className={productStyle["add-to-cart-btn"]}>Add to Cart</button> */}
        </div>
    )
}

export default SingleProduct;