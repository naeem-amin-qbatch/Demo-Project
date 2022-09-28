import React from "react";
import NavBar from "../navbar/navbar";
import './cart.css'
import pic from '../images/bg.png'

const Cart = () => {
    return (
        <>
            <NavBar />
            <div className="container-fluid text-white p-0">
                <div className="cart-img d-flex justify-content-center align-items-center">
                    <img src={pic} className="img-fluid w-100" alt="" />
                    <div className="carousel-caption cart-title d-flex justify-content-center align-items-center">
                        <h1 className="fw-bold display-3">Cart</h1>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-8 d-flex justify-content-between">
                        <div className="decorate col-2">Product</div>
                        <div className="decorate col-2">Price</div>
                        <div className="decorate col-2">Qauntity</div>
                        <div className="decorate col-1">Subtotal</div>
                        <div className="decorate col-1">Remove</div>
                    </div>
                    <div className="col-4">Summary</div>
                </div>
                <div className="row">
                    <div className="col-8"></div>
                    <div className="col-4">
                        <p>Total</p>
                        <div className="d-grid gap-2 mb-2">
                            <button className="btn btn-primary">Check Out</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Cart