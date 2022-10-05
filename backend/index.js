import dotenv from 'dotenv'
dotenv.config()
const { PORT } = process.env;
import express, { json, urlencoded } from "express";
import cors from 'cors';
const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
import connectDB from './utils/databaseConnection.js';
import productRoute from './routes/productRoutes.js';
import userRoute from './routes/userRoutes.js';
import cartRoute from './routes/cartRoutes.js';

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
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  })