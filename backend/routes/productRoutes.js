import productsData from '../data/products.js';
import { Router } from "express";
const app = Router();
import Product from '../Schema/productSchema.js'


// Insert Products into database
app.post("/insert", async (req, res) => {
  try {
    const data = await Product.insertMany(productsData);
    console.log('insert products: ', data)
    res.send(data);
  } catch (e) {
    res.status(404).send(e)
  }
});

// Get all Products from database
app.get("/all", async (req, res) => {
  try {
    const allProducts = await Product.find({});
    console.log('allProducts: ', allProducts)
    res.send(allProducts);
  } catch (e) {
    res.status(404).send(e)
  }
})

// Get Products by ID
app.get('/:id', async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    console.log('Product by id: ', data)
    res.send(data);
  } catch (e) {
    res.status(404).send(e)
  }
})

export default app;