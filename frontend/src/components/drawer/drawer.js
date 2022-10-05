import React, { useState, useEffect } from 'react';
import Drawer from 'react-modern-drawer'
import {FaArrowAltCircleLeft} from 'react-icons/fa';
import 'react-modern-drawer/dist/index.css'
import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from 'react-redux';
import './drawer.css'
import axios from "axios";
import { setProductId } from "../../redux/cart-slice";
import { addToCart,} from '../../redux/cart-slice';
// import {  useParams } from 'react-router-dom';

const MyDrawer = (data) => {
    // const { id : userId} = useParams();
    // console.log(useParams)
    // console.log(params)
    // let userId = location.state.userId
    // console.log('userId in drawer from params',userId)
    const dispatch = useDispatch();
    const { isOpen, userId} = data
    console.log(isOpen,userId)
    const { productId } = useSelector(state => state.cart);
    const { quantity } = useSelector((state) => state.cart);
    let [num, setNum]= useState(0);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        if (productId) {
            Product();
        }
    },[productId]);
    
    const Product = async () => {
        try {
            let { data } = await axios.get(`http://localhost:3000/products/${productId}`);
            console.log({ data });
            const product = data;
            setProduct(product);
        } catch (e) {
            console.log(e)
        }
    }
    const handleCartClick = (product,userId,quantity) => {
        dispatch(addToCart({ product, userId,quantity }))
    }

  let incNum =()=>{
    setNum(num+1);
 
  }
  let decNum = () => {
     if(num>0)
     {
      setNum(num - 1);
  
     }
  }

 let handleChangeQuantity = (e)=>{
   setNum(e.target.value);

  }

    return (
        <div>
            <Drawer
                open={productId}
                direction='right'
                className="drawer-width"
            >
                <FaArrowAltCircleLeft className='mt-2 fs-4 ms-1 text-primary' onClick={() => dispatch(setProductId(''))}/>
                <div className="container-fluid d-flex flex-column">
                    <div className="d-flex flex-column justify-content-center align-items-center text-black">
                        <img className="w-75 h-50" src={product.image} />
                        <h1 className="mt-2">{product.name}</h1>
                    </div>
                    <div className="text-black mt-2">
                        <h2>Price: {product.price} Rs</h2>
                        <ReactStars value={product.rating} isHalf={true}/>
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
                            <button className="btn btn-primary fw-bold me-2" onClick={decNum}>-</button>
                            {/* <div className="ms-3 me-3" value={num} onChange={handleChangeQuantity}><h4>{ quantity }</h4></div> */}
                            <input type="text" className="form-control text-center" value={num} style={{width: "50px"}} onChange={handleChangeQuantity}/>
                            <button className="btn btn-primary fw-bold ms-2" onClick={incNum}>+</button>
                        </div>
                    </div>

                    <div className="d-grid gap-2 mb-2">
                        <button className="btn btn-primary fw-bold" onClick={(e) => {
                            e.stopPropagation();
                            let quantity = num;
                            handleCartClick(product,userId,quantity)
                        }}>Add To Cart</button>
                    </div>
                </div>

            </Drawer>
        </div>
    );
}

export default MyDrawer;
