import { Router } from "express";
import Product from '../schema/product.js'
import productsData from '../data/products.js';
const app = Router();


// Insert Products into database
app.post("/insert", async (req, res) => {
  try {
    const data = await Product.insertMany(productsData);
    console.log('insert products: ',data)
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).send(e)
  }
});

// Get all Products from database
app.get("/all", async (req, res) => {
  try {
    const allProducts = await Product.find({});
    // console.log('allProducts: ', allProducts)
    return res.status(200).send(allProducts);
  } catch (e) {
    return res.status(500).send(e)
  }
})

// Get Products by ID
app.get('/:id', async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    console.log('Product by id: ', data)
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).send(e)
  }
})

export default app;