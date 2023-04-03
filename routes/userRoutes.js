const express = require('express');
const {
  emailValidation,
  signUp,
  emailVerification,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/user/signup');
const {
  getMerchants,
  createMerchant,
} = require('../controllers/user/merchant');

const router = express.Router();
router.route('/signup').post(emailValidation, signUp);
router.route('/merchant').get(getMerchants).post(createMerchant);

router.route('/verification').post(emailVerification);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);

module.exports = router;

// hello world! how's your going?
