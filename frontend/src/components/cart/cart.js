import React, { useState } from "react";
import NavBar from "../navbar/navbar";
import './cart.css'
import pic from '../images/bg.png'
import { useSelector } from "react-redux"
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


const Cart = () => {
    const { cart } = useSelector(item => item.cart)
    console.log("cart: ", cart)
    const [value, setValue] = useState();

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
                                <input type="number" name='number' value={value} min="0" max="1000" step="1" onChange={(e) => setValue(e.target.value)} />
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
        </>
    )
}
export default Cart