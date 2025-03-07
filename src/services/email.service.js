require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (name, to, subject, text) => {
  const formattedHtmlMessage = `<div><h1>Name: ${name}</h1><p>${text}</p></div>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    sender: process.env.EMAIL_SENDER,
    to,
    subject,
    html: formattedHtmlMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
