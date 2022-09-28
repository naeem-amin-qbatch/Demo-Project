import React, { useState, useEffect } from "react";
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./product-details.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom'
import { FaArrowCircleRight } from "react-icons/fa";


const Sidebar = () => {
  let [count, setCount] = useState(0);
  const [product, setProduct] = useState([]);
  let { id } = useParams();
  console.log(id)
  const Product = async () => {
    let { data } = await axios.get(`http://localhost:3000/products/${id}`)
    const product = data;
    setProduct(product);
  }
  useEffect(() => {
    Product();
  }, []);

  let incrementCount = () => {
    count = count + 1;
    setCount(count)
  }
  let decrementCount = () => {
    count = count - 1;
    setCount(count)
  }

  return (
    <div id="header" >
      <ProSidebar >
        <SidebarHeader className="sidebar-header ">
          <FaArrowCircleRight className="arrow fs-2" />
        </SidebarHeader>
        <SidebarContent className="sidebar-content">
          <div className="container-fluid d-flex flex-column">
            <div className="d-flex flex-column justify-content-center align-items-center text-black">
              <img src={product.image} />
              <h1 className="mt-2">{product.name}</h1>
            </div>
            <div className="text-black mt-2">
              <h2>Price: {product.price} Rs</h2>
              <ReactStars />
              <div className="d-flex justify-content-between align-items-center me-5 mt-1">
              <p><b>Brand:</b> {product.brand}</p>
              <p><b>Category:</b> {product.category}</p>
              </div>
              <p><b>In Stock:</b> <span className={product.total_availability < 10 ? "text-danger fw-bold fs-5" : "text-success fw-bold fs-5"}
              >{product.total_availability}</span> items</p>
              <p><b>Description:</b> {product.description} Since the inline CSS is written in a JavaScript object,
                properties with two names, like background-color, must be writte˙</p>
            </div>
            <div className="quantity d-flex mb-3 text-black">
              <div className="d-flex align-items-center">
                <h5><b>Quantity: </b></h5>
              </div>
              <div className="d-flex flex-row ms-3">
                <button class="btn btn-primary" onClick={incrementCount}>+</button>
                <div className="ms-3 me-3"><h4>{count > 0 ? count : 0}</h4></div>
                <button class="btn btn-primary" onClick={decrementCount}>-</button>
              </div>
            </div>

            <div className="d-grid gap-2 mb-2">
              <button className="btn btn-primary">Add To Cart</button>
            </div>
          </div>
        </SidebarContent>
        <SidebarFooter>
        </SidebarFooter>
      </ProSidebar>
    </div>

  );
};

export default Sidebar;
