const express = require('express');
const {
  emailValidation,
  signUp,
  emailVerification,
  login,
} = require('../controllers/user/signup');

const router = express.Router();
router.route('/signup').post(emailValidation, signUp);
router.route('/verification').post(emailVerification);
router.route('/login').post(login);

module.exports = router;
