const User = require('../../models/userModel');
const generateWebToken = require('../../utils/generateWebToken');
const sendEmail = require('../../utils/sendEmail');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

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

exports.signUp = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const data = { ...req.body, sing: 'createdByIsh' };
  const user = await User.create(data);

  const token = generateWebToken(user.email);
  await sendEmail(user.email, user.name);
  res.status(201).json({
    message: token,
  });
});
