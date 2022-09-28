import React from "react"
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom'
import './products.css'

const handleClick = (req,res)=>{
    console.log(" body: ",req.body)
    console.log("req.params: ",req.params)

}

const Products = ({ product }) => {
    return (
        <div className="">
            <Link className="productCard" to={`/details/${product._id}`}>
                <div className="card">
                    <img src={product.image} className='w-100' style={{ height: '200px' }} alt="no image" />
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
                            <Link to={"/home"} className="btn btn-primary mt-2">Add to Cart</Link>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default Products;