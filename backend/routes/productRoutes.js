const productsData = require('../data/products')
const Product = require('../Schema/productSchema')
const express = require("express");
const app = express.Router();
const asyncHandler = require('express-async-handler')


// Insert Products into database
app.post("/insert", async (req, res) => {
  const data = await Product.insertMany(productsData);
  if (data)
    res.send(data);
  else {
    res.status(404)
    throw new Error('Products Not Inserted')
  }
});

// Get all Products from database
app.get("/all", asyncHandler(async (req, res) => {
  const allProducts = await Product.find({});

  if (allProducts)
    res.send(allProducts);
  else {
    res.status(404)
    throw new Error('Products Not Found')
  }
}))

// Get Products by ID
app.get('/:id', asyncHandler(async (req, res) => {
  const data = await Product.findById(req.params.id);
  if (data) {
    res.send(data);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
}))

module.exports = app;