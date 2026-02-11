const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // connects to smtp-relay.brevo.com
    port: process.env.SMTP_PORT, // connects to 587
    secure: false, 
    auth: {
      user: process.env.SMTP_USER, // uses a2215b001@smtp-brevo.com
      pass: process.env.SMTP_PASS, // uses your secret key
    },
  });

  const mailOptions = {
    from: `SyncEdu <${process.env.EMAIL_FROM}>`, // shows your real email to user
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;