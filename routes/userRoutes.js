const express = require('express');
const {
  emailValidation,
  signUp,
  getUsers,
} = require('../controllers/user/signup');

const router = express.Router();
router.route('/signup').post(emailValidation, signUp);
router.route('/users').get(getUsers);
module.exports = router;
