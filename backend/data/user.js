const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [
  {
    "name": "Jamal",
    "password": "jamal123",
    "email": "jamal@gmail.com",
    "phone": "03666666666"
  },
]

module.exports = users