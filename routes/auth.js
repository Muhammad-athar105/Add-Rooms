const express  = require('express');
const router = express.Router();

// import auth controller
const {login,signup} = require('./../app/controllers/AuthController');

// login route
router.post('/login', login);

// signup route
router.post('/signup', signup);

module.exports = router;