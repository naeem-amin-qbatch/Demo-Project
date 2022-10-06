import { Router } from "express";
import pkg from 'bcryptjs';
import jet from 'jsonwebtoken';
import dotenv from 'dotenv'
import User from '../schema/user.js';
import Auth from '../middlewares/jwt-auth.js';
const { hash, compare } = pkg;
const { sign } = jet;
const app = Router();
const { TOKEN_KEY } = process.env;
dotenv.config()

// Insert users into database
app.post("/adduser", async (req, res) => {
    const { name, email, phone, password } = req.body;
    const foundUser = await User.findOne({ email: email })
    if (foundUser) {
        return res.status(409).send({ message: 'User Already Exist' })
    } else {
        const hashedPassword = await hash(password.toString(), 10);
        const user = new User({
            name,
            email,
            phone,
            password: hashedPassword,
        })
        console.log("password: ", password)
        await user.save(err => {
            if (err) {
                console.log('already in db')
                return res.status(409).send(err)
            } else {
                return res.status(200).send({ message: "successful registered" })
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
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
})

app.post('/getuser', Auth, async (req, res) => {
    return res.status(200).send("Welcome 🙌 ");
})


// get all users
app.get('/all', async (req, res) => {
    try {
        const data = await User.find({})
        console.log(data);
        return res.status(200).send(data)

    } catch (e) {
        console.log(e)
        return res.status(500).send(data)

    }
})


// Get Users by ID
app.get('/:id', Auth, async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        console.log(data)
        return res.status(200).send(data)

    } catch (e) {
        console.log(e)
        return res.status(500).send(data)
    }
})
export default app;