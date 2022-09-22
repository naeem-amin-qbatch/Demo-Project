const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return v.length === 11
            },
            message: val => `${val.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    },
    {
        timestamps: true
    })

const User = new mongoose.model('User', userSchema)
module.exports = User;