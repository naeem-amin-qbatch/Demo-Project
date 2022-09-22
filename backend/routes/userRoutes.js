require("dotenv").config();

const { TOKEN_KEY } = process.env;
const userData = require('../data/user');
const User = require('../schema/userSchema');
const express = require("express");
const bcrypt = require('bcryptjs');
const app = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Auth = require('../middlewares/jwt_auth')
// Insert users into database
app.post("/adduser", asyncHandler(async (req, res) => {
    // console.log(userData);
    const newArray = [];
    for (const item of userData) {
        let { password } = item;
        const hashedPassword = await bcrypt.hash(password.toString(), 10);
        newArray.push({
            ...item,
            password: hashedPassword
        });
    }
    // console.log('New Array', newArray);
    const data = await User.insertMany(newArray, { ordered: false })
    if (data)
        res.send(data);
    else {
        res.status(404)
        throw new Error('Users Not Inserted')
    }
}));


// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('email: ', email)
        console.log('password: ', password)
        // Validate user input
        if (!(email && password)) {
            res.status(404).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
        console.log('user from DB', user);
        if (user && (bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                TOKEN_KEY,
                {
                    expiresIn: "30d",
                }
            );
            // save user token
            user.token = token;
            console.log('user.token', user.token);
            // user
            return res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
})

app.post('/getuser', Auth, async (req, res) => {
        res.status(200).send("Welcome 🙌 ");

 })


// get all users
app.get('/all',async (req,res) => {
const data = await User.find({})
if(data){
    console.log(data);
    res.send(data)
}else{
    res.status(404)
    throw new Error('Users Not Found')
}
})


// Get Users by ID
app.get('/:id', Auth, asyncHandler(async (req, res) => {
    const data = await User.findById(req.params.id);
    if (data) {
      res.send(data);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  }))
module.exports = app;