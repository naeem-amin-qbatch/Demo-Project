const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [
  {
      name: 'Siraj',
      password: 'siraj123',
      email: 'siraj@gmail.com',
      phone: '03232911234',
  },
]

module.exports = users