exports.emailVerificationHtml = function (credentials) {
  return `<html>
  <body>
    <p>Dear ${credentials.user},</p>
    <p>Thank you for registering with our ecommerce website. To ensure the security of your account and prevent unauthorized access, we require account verification.</p>
    <p>To complete the verification process, please click on the following link or copy and paste it into your browser:</p>
    <a href="${credentials.link}">[insert link here]</a>
    <p>If the link above does not work, please go to our website and navigate to the account verification page.</p>
    <p>Thank you for choosing our ecommerce website for your online shopping needs. If you have any questions or concerns, please do not hesitate to contact our customer support team.</p>
    <p>Best regards,</p>
    <p>[Oreby Ecommerce Website Team]</p>
  </body>
</html>`;
};
