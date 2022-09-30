import React from "react";
import NavBar from "../navbar/navbar";
import Products from "../product/products";
import DiscriprionDrawer from '../drawer/drawer';
import axios from "axios";
import { useState, useEffect } from "react";
import './home-page.css'
import pic from '../images/home-bg.png'

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const allProducts = async () => {
        let { data } = await axios.get('http://localhost:3000/products/all')
        const products = data;
        setProducts(products);
    }
    useEffect(() => {
        allProducts();
    }, []);

    return (
        <div >
            <NavBar />
            <div className="container-fluid image text-white">
                <img src={pic} className="img-fluid img-tag w-100" alt="" />
                <div className="carousel-caption heading d-flex justify-content-center align-items-center">
                    <h1 className="fw-bold display-1">Ecommerce</h1>
                </div>
            </div>
            <div>
                <h2 className="fw-bold text-center mt-5">Products</h2>
                <hr/>
                <div className="container d-flex mt-2 flex-wrap justify-content-center">
                    {
                        products && products.map(product => (
                            <Products key={product._id} product={product} />
                        ))
                    }
                </div>
            </div>
            <DiscriprionDrawer isOpen={true}/>
        </div>
    )
}

export default HomePage