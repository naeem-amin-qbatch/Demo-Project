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
app.post("/adduser", async (req, res) => {
    const { name, email, phone, password } = req.body;
    const foundUser = await User.findOne({ email: email })
    if (foundUser) {
        res.send({ message: 'User Already Exist' })
    } else {
        const hashedPassword = await bcrypt.hash(password.toString(), 10);
        const user = new User({
            name,
            email,
            phone,
            password: hashedPassword,
        })
        console.log("password: ", password)
        user.save(err => {
            if (err) {
                console.log('already in db')
                res.send(err)
            } else {
                res.send({ message: "successful registered" })
            }
        })
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('email: ', email)
        console.log('password: ', password)
        // Validate if user exist in our database
        const user = await User.findOne({ email });
        console.log('user from DB', user);
        if (user && await (bcrypt.compare(password, user.password))) {
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
            return res.status(200).json(user); // user
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
app.get('/all', async (req, res) => {
    const data = await User.find({})
    if (data) {
        console.log(data);
        res.send(data)
    } else {
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