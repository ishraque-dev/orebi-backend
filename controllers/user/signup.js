const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const generateWebToken = require('../../utils/generateWebToken');
const sendEmail = require('../../utils/sendEmail');
const catchAsync = require('../../utils/catchAsync');
const { emailVerificationHtml } = require('../../utils/emailTemp');
const AppError = require('../../utils/appError');

exports.emailValidation = async function (req, res, next) {
  const regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/.test(req.body.email);
  if (!regex) {
    return next(new AppError('Invalid email address', 400));
  }
  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail && existingEmail.email === req.body.email) {
    return next(new AppError('email address already exist', 400));
  }
  next();
};

exports.signUp = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const data = { ...req.body, sing: 'createdByIsh' };
  const user = await User.create(data);

  const token = generateWebToken(user.email);
  const url = `${req.protocol}://${req.get('host')}/api/v1/users/verification`;

  const html = emailVerificationHtml({ user: user.name, link: url });
  await sendEmail(user.email, user.name, html);
  res.status(201).json({
    message: token,
  });
});
// Login
exports.login = async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password'));
  }
  const user = await User.findOne({ email: email });
  if (!user.verified) {
    return next(new AppError('Please verify your email to continue', 401));
  }
  const correct = user && (await user.correctPassword(password, user.password));

  if (!user || !correct) {
    return next(new AppError('Incorrect email or password', 401));
  }
  res.status(200).json({
    user,
  });
};
exports.emailVerification = async function (req, res, next) {
  let token;
  if (req.headers && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Unauthorized. Please login and try again', 401));
  }
  // Verify the token
  const decodedToken = await promisify(jwt.verify)(token, 'UR6YKRyMrz');

  const alreadyVerified = await User.findOne({
    email: decodedToken.data,
  });
  if (alreadyVerified.verified) {
    return next(new AppError('Your account has already been verified', 400));
  }
  const currentUser = await User.findOneAndUpdate(
    decodedToken.data,
    {
      verified: true,
    },
    {
      new: true,
    }
  );
  res.json({
    status: 'success',
    currentUser,
  });
};
// Forgot Password

exports.forgotPassword = async function (req, res, next) {
  // Get the user based on the posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError(`There is no user with email ${req.body.email}`));
  }
  // Generate the random token
  const resetToken = user.createPasswordResetToken();
  await user.save({
    validateBeforeSave: false,
  });
  // Send it to the users email address
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;
  const html = `Forgot your password? Click the link below to reset your password \n ${resetUrl} `;
  try {
    await sendEmail(user.email, undefined, html);
    res.status(200).json({
      status: 'success',
      message: 'Token has successfully sended',
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresIn = undefined;
    return next(
      new AppError(
        'There was an error sending the token. Please try again later'
      )
    );
  }
};
