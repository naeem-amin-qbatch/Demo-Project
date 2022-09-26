import React from "react"
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom'
import './products.css'

const Products = ({ product }) => {

    return (
        <div >
            <Link className="productCard" to={product._id}>
                <div className="card">
                    <img src={product.image} className='w-100' style={{height:'200px'}} alt="no image"/>
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p>Price: {product.price}</p>
                            <div><ReactStars value={product.rating}/></div>
                            <a href="#" className="btn btn-primary mt-2">Add to Cart</a>
                        </div>
                </div>
            </Link>
        </div>
    )
}
export default Products