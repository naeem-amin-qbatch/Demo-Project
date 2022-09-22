const Cart = require('../schema/cartSchema')
const express = require("express");
const app = express.Router();
const asyncHandler = require('express-async-handler')
const Product = require('../schema/productSchema');


app.post("/add-to-cart", async (req, res) => {
  console.log('req body: ', req.body)
  const { user, product } = req.body;
  console.log(user, product)
  const productDetails = await Product.findById(product) // get all product details here
  try {
    const cart = await Cart.findOne({ user }); // check if user already in Cart
    if (cart) {
      // user already in the cart
      let cart_id = cart._id; // get cart id
      try {
        await Cart.updateOne( // update product list
          { _id: cart_id },
          { $addToSet: { product: req.body.product } }
        )
        return res.status(201).send("Successfully updated");
      } catch (e) {
        console.log(e)
      }
    }
    else {
      //no cart for this user, create new cart
      try {
        const newCart = await Cart.create({ user, product });
        console.log('Cart data after createCart api', newCart)
        return res.status(201).send(newCart);
      } catch (e) {
        console.log(e)
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).send("Something went wrong");
  }
});


app.get('/getcart', async (req,res) => {

})
module.exports = app;