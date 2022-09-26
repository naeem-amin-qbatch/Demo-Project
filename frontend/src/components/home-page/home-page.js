import React from "react"
import NavBar from "../navbar/navbar"
import Products from "../product/products"
import axios from 'axios'
import { useState, useEffect } from "react";

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
            <h2 className="fw-bold text-center mt-5">Products</h2>
            <div className="container d-flex mt-5 flex-wrap">
                {
                    products && products.map(product => (
                    <Products product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default HomePage