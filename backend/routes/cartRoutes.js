const Cart = require('../Schema/cartSchema')
const express = require("express");
const app = express.Router();
const asyncHandler = require('express-async-handler')
const cartData = require('../data/cart');
const Product = require('../Schema/productSchema');

// Create cart into database
app.post("/create", async (req, res) => {
  const data = await Cart.insertMany(cartData);
  if (data)
    res.send(data);
  else {
    res.status(404)
    throw new Error('Cart Not Created')
  }
});



app.post("/add-to-cart", async (req, res) => {
  console.log('req body: ', req.body)
  //const { productId, quantity, name, price } = req.body;
  const { user, product } = req.body;
  console.log(user, product)
  const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id
  // get all product details here
  const productDetails = await Product.findById(product)
  console.log("productDetails ", productDetails)

  try {
    let cart = ''
    cart = await Cart.findOne({ userId });
    console.log("cart: ", cart)
    if (cart) {
      //cart exists for user
      //  let itemIndex = cart.product.indexOf(p => p.product.toString() == product.toString()); // check product id in cart with product given(clicked)
      let itemIndex = cart.product
      console.log("itemIndex: ", itemIndex)

      if(cart.product == product){
        console.log('found')
      }else{
        console.log('not found')
      }
      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        //productItem.quantity = quantity;
        // cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ name, price, image });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await cart.create({
        //userId,
        user,
        //products: [{ productId, quantity, name, price }]
        product,
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});
module.exports = app;