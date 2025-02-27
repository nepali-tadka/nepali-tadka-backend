const sendEmail = require("../services/email.service");

class EmailController {
  async sendEmail(req, res) {
    const { name, email, subject, message } = req.body;

    try {
      await sendEmail(name, email, subject, message);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error sending email", error });
    }
  }
}

module.exports = new EmailController();
