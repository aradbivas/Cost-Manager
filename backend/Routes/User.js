const express = require('express');
const router = express.Router();
const {login, signup} = require('../Controllers/AuthController')

//login
router.post('/login', login)

//signup
router.post('/register', signup)


module.exports = router;