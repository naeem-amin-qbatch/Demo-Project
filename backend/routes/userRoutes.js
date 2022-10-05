// require("dotenv").config();
import dotenv from 'dotenv'
import User from '../schema/userSchema.js';
import Auth from '../middlewares/jwt_auth.js';
import jet from 'jsonwebtoken';
import { Router } from "express";
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
const app = Router();
const { sign } = jet;
const { TOKEN_KEY } = process.env;
dotenv.config()

// Insert users into database
app.post("/adduser", async (req, res) => {
    const { name, email, phone, password } = req.body;
    const foundUser = await User.findOne({ email: email })
    if (foundUser) {
        res.send({ message: 'User Already Exist' })
    } else {
        const hashedPassword = await hash(password.toString(), 10);
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
        if (user && await (compare(password, user.password))) {
            // Create token
            const token = sign(
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
    try {
        const data = await User.find({})
        console.log(data);
        res.send(data)

    } catch(e) {
        console.log(e)
        res.status(404)
    }
})


// Get Users by ID
app.get('/:id', Auth, async (req, res) => {
    try {
    const data = await User.findById(req.params.id);
    console.log(data)
    res.send(data);

    } catch(e) {
        console.log(e)
        res.status(404)
    }
})
export default app;