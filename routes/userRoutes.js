const express = require('express');
const {
  emailValidation,
  signUp,
  emailVerification,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/user/signup');

const router = express.Router();
router.route('/signup').post(emailValidation, signUp);
router.route('/verification').post(emailVerification);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);

module.exports = router;
