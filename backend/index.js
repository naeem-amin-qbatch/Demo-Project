require("dotenv").config();
const { PORT } = process.env;
const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = require('./databaseConnection')
const productRoute = require('./routes/productRoutes')
const userRoute = require('./routes/userRoutes')
const cartRoute = require('./routes/cartRoutes')

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