import { request, Router } from "express";
import { Types } from 'mongoose';
import Cart from "../schema/cart.js"
const app = Router();

app.post("/add-to-cart", async (req, res) => {
  const user_id = req.body.user_id;
  console.log('user_id: ',user_id)
  console.log('req body.product',req.body.product)
  const product = Types.ObjectId(req.body.product); 
  console.log('product id convert to objectID: ',product)
  try {
    const cart = await Cart.findOne({ user_id });
     // check if user already in Cart
    if (cart) {
      // user already in the cart
      console.log('cart: ',cart)
      let insertProductId = product;
       console.log('i pd id: ',insertProductId)
      let cart_id = cart._id; // get cart id
      let bool = true;
      for (let i = 0; i < cart.products.length; i++) {
        let cartProductId = cart.products[i].product;
        console.log('cart productId: ',cartProductId)
        if (cartProductId === insertProductId) {
          // cart.products[i].quantity = products[0].quantity;
          // await cart.save();
          bool = false;
          break;
        }
      }
      if (bool === true) {
        try {
          console.log('before update product is: ',product)
          await Cart.updateOne( // update product list
            { _id: cart_id },
            { $addToSet: { products: {product} } },
          )
          return res.status(200).send("Successfully updated");
        } catch (e) {
          console.log(e)
          return res.status(500).send(e);

        }
      }
      res.status(409).send('Already in the cart')
    }
    else {
      console.log('new cart make')
      let products=[{product}]
      console.log('products: ',products)
      //no cart for this user, create new cart
      try {
        console.log('new cat product: ',product)
        const newCart = await Cart.create({ user_id, products });
        return res.status(200).send(newCart);
      } catch (e) {
        console.log(e)
        return res.status(500).send(e);

      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

// get by id
app.get('/:id', async (req, res) => {
  const user_id = req.params.id;
  try {
    const userCart = await Cart.findOne({ user_id })
    return res.status(200).send(userCart)
  } catch (e) {
    console.log(e)
    return res.status(404).send('userCart not found')
  }
})

export default app;