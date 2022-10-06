import React from "react";
import NavBar from "../navbar/navbar";
import Products from "../product/products";
import DiscriprionDrawer from '../drawer/drawer';
import { useState, useEffect } from "react";
import './home-page.css';
import pic from '../images/home-bg.png';
import Footer from "../footer/footer";
import { getAllProducts } from "../../redux/slices/product";
import { useDispatch } from "react-redux";

const HomePage = () => {
    const dispatch = useDispatch();
    let [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        dispatch(getAllProducts()).then((response) => {
            console.log(response)
            allProducts = response.payload;
            
            setAllProducts(allProducts);
        })
    }, [])

    return (
        <div >
            {/* <NavBar userId={userId} /> */}
            <NavBar />
            <div className="container-fluid image text-white">
                <img src={pic} className="img-fluid img-tag w-100" alt="" />
                <div className="carousel-caption heading d-flex justify-content-center align-items-center">
                    <h1 className="fw-bold display-1">Ecommerce</h1>
                </div>
            </div>
            <div>
                <h2 className="fw-bold text-center mt-5">Products</h2>
                <hr />
                <div className="container d-flex mt-2 flex-wrap justify-content-center">
                    {
                        allProducts && allProducts.map(product => (
                            <Products key={product._id} product={product} />
                        ))
                    }
                </div>
            </div>
            <DiscriprionDrawer isOpen={true} />
            <Footer />
        </div>
    )
}

export default HomePage