import React, { useState } from "react"
import ReactStars from "react-rating-stars-component";
import './products.css'
import { useDispatch } from "react-redux";
import { addToCart, setProductId } from "../../redux/cart-slice";

const Products = ({ product }) => {
    const dispatch = useDispatch();

    const handleCartClick = (product) => {
        dispatch(addToCart(product))
    }
    return (
        <div className="productCard" onClick={() => dispatch(setProductId(product._id))}>
            <div className="card divStyle" >
                <img className="imgStyle" src={product.image} alt={product.name} />
                <div className="card-body">
                    <div className="d-flex justify-content-center align-items-center">
                        <h5 className="card-title d-flex align-items-center">{product.name}</h5>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="d-flex justify-content-center align-items-center">Price: {product.price}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <ReactStars value={product.rating} />
                    </div>
                    <div className="text-center">
                        <a className="btn btn-primary mt-2" onClick={(e) => {
                            e.stopPropagation();
                            handleCartClick(product)
                        }}>Add to Cart</a>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Products;