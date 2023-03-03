const nodemailer = require('nodemailer');

const sendEmail = async function (receiver, userName, html) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'ahamedesrak3@gmail.com', // generated ethereal user
        pass: 'xpwllyhvdaykbwdi', // generated ethereal password
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: {
        name: 'Ishraque',
        address: "'ahamedesrak3@gmail.com'",
      }, // sender address
      to: receiver, //'ishrak575@gmail.com', // list of receivers
      subject: 'Registration successful', // Subject line
      //   text: , // plain text body
      html: html,
    });
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = sendEmail;
