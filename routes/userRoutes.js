const express = require('express');
const { emailValidation, signUp } = require('../controllers/user/signup');

const router = express.Router();
router.route('/signup').post(emailValidation, signUp);
module.exports = router;
