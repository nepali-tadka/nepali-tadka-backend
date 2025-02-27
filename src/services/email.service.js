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
  const formattedHtmlMessage = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="background-color: #f7f7f7; padding: 20px; border-radius: 10px;">
      <h2 style="color: rgb(211, 84, 0);">Message from: ${name}</h2>
      <p style="color: #333;">Email: ${to}</p>
      <p>${text}</p>
      <p style="color: #333; font-style: italic">Note: A copy of acknowledgement has been sent to the user email address.</p>
    </div>
  </div>`;

  // send mail to the company mail account
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject,
    html: formattedHtmlMessage,
  };

  // send mail to the user
  const mailOptionsToUser = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Nepali Tadka - Contact Form",
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="background-color: #f7f7f7; padding: 20px; border-radius: 10px;">
        <h2 style="color: rgb(211, 84, 0);">Thank you for contacting us!</h2>
        <p style="color: #333;">We have received your message and will get back to you as soon as possible.</p>
        <p style="color: #888;">Best regards,<br/>Nepali Tadka Team</p>
      </div>
    </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptionsToUser);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
