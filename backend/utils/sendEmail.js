const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,          
    secure: true,     
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000, 
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    html: options.message,
  });
};

module.exports = sendEmail;

