import React, { useState } from "react";
import NavBar from "../navbar/navbar";
import './cart.css'
import pic from '../images/cart-bg.png'
import { useSelector, useDispatch } from "react-redux"
import { FaTrashAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Footer from "../footer/footer"
import { decrement, increment, showCart } from '../../redux/cart-slice';


const Cart = () => {
    let location = useLocation();
    const dispatch = useDispatch();
    console.log("location: ", location)
    const { userId } = location.state
    dispatch(showCart(userId));
    const { cart } = useSelector(item => item.cart)
    const { quantity } = useSelector((state) => state.cart);

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

            <div className="d-flex justify-content-center fw-bold fs-1 mt-2">Your Cart</div>
            <div className="container mt-5">

                <div className="row">
                    <div className="d-flex justify-content-between">
                        <div className="col-style col-2"><b>Image</b></div>
                        <div className="col-style col-2"><b>Name</b></div>
                        <div className="col-style col-2"><b>Price</b></div>
                        <div className="col-style col-2"><b>Qauntity</b></div>
                        <div className="col-style col-1"><b>Subtotal</b></div>
                        <div className="col-style col-1"><b>Remove</b></div>
                    </div>
                    <hr className="hrCart" />
                </div>

                {cart?.map((item) => (
                    <div className="row">
                        <div className="d-flex justify-content-between">
                            <div className="col-style col-2 mt-2 mb-2">
                                <img className="h-75 w-75" src={item.image} />
                            </div>
                            <div className="col-style col-2">{item.name}</div>
                            <div className="col-style col-2">{item.price}</div>
                            <div className="col-style col-2 quantity">
                                <button className="btn btn-primary fw-bold" onClick={() => dispatch(increment())}>+</button>
                                <div className="ms-3 me-3"><h4>{quantity}</h4></div>
                                <button className="btn btn-primary fw-bold" onClick={() => dispatch(decrement())}>-</button>
                            </div>
                            <div className="col-style col-1">Subtotal</div>
                            <div className="col-style col-1"><Link className="text-danger"><FaTrashAlt /> </Link></div>
                        </div>
                        <hr className="hrCart" />

                    </div>
                ))}

                <div className="row d-flex justify-content-end mt-5">
                    <div className="col-md-4">

                        <b><p className="d-flex justify-content-center">Summary</p></b>
                        <hr className="hrCartTotal" />
                        <h2>Total:</h2>
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Cart