const Cart = require('../schema/cartSchema')
const express = require("express");
const app = express.Router();
const Product = require('../schema/productSchema');
const mongoose = require('mongoose');


app.post("/add-to-cart", async (req, res) => {
  const user_id = req.body.userId;
  const products = req.body.products.map(
    (objValue) => {
      objValue.product = mongoose.Types.ObjectId(objValue.product);
      return objValue;
    }
  )
  try {
    const cart = await Cart.findOne({ user_id }); // check if user already in Cart
    if (cart) {
      // user already in the cart
      let cart_id = cart._id; // get cart id
      let bool = true;
      for (let i = 0; i < cart.products.length; i++) {
        let cartProductId = cart.products[i].product;
        let insertProductId = products[0].product;
        if (cartProductId.toString() === insertProductId.toString()) {
          cart.products[i].quantity = products[0].quantity;
          cart.save();
          bool = false;
          break;
        }
      }
      if (bool === true) {
        try {
          await Cart.updateOne( // update product list
            { _id: cart_id },
            { $addToSet: { products: req.body.products } },
          )
          return res.status(201).send("Successfully updated");
        } catch (e) {
          console.log(e)
        }
      }
      res.status(200).send('Already in the cart')
    }
    else {
      //no cart for this user, create new cart
      try {
        const newCart = await Cart.create({ user_id, products });
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


app.get('/getcart/:id', async (req, res) => {
  const user_id = req.params.id;
  try {
    const userCart = await Cart.findOne({ user_id })
    res.send(userCart)
  } catch (e) {
    console.log(e)
    res.send('userCart not found')
  }
})

module.exports = app;