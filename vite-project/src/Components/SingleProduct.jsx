import productStyle from './Product.module.css';
import pd1 from "../Assets/pro-1.jpeg";

function SingleProduct(props){
    return(
        <div className={productStyle["col-4"]}>
                    <img className={productStyle.productImage} src={props.img} alt="Green Jacket" />
                    <h4>{props.name}</h4>
                    <p>{props.price}&#x09F3;</p>
                    <div className={productStyle.rating}>
                        <span className={`${productStyle.fa} ${productStyle["fa-star"]} ${productStyle.checked}`}></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star-o"></span>
                    </div>
                    <button className={productStyle["add-to-cart-btn"]}>Add to Cart</button>
                </div>
    )
}

export default SingleProduct;