import dotenv from 'dotenv'
import express, { json, urlencoded } from "express";
import connectDB from './config/databaseConnection.js';
import productRoute from './routes/product.js';
import userRoute from './routes/user.js';
import cartRoute from './routes/cart.js';
import cors from 'cors';
dotenv.config()
const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
const PORT = 3000;
// const { PORT } = process.env;

app.get('/', function (req, res) {
  res.send('Hello World');
})

///////////// ROUTES  /////////////
// Product Route
app.use('/products',productRoute)
// User Routes
app.use('/users',userRoute)
// Cart Routes
app.use('/cart',cartRoute)
// RUN APP
app.listen(3000, async () => {
    await connectDB();
    console.log('Server running on port 3000');
  })