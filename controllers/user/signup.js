const User = require('../../models/userModel');

exports.emailValidation = async function (req, res, next) {
  const regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/.test(req.body.email);
  if (!regex) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid email address',
    });
  }
  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail && existingEmail.email === req.body.email) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid email address',
    });
  }
  next();
};

exports.signUp = async function (req, res, next) {
  try {
    const data = { ...req.body, sing: 'createdByIsh' };
    const user = await User.create(data);
    res.status(201).json({
      message: 'created successfully',
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
