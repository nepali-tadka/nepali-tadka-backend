const User = require("../models/user.model");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    let user = await User.findOne({
      username: req.body.username,
    });

    if (user) {
      return res.status(400).send({ message: "Username is already in use!" });
    }

    user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).send({ message: "Email is already in use!" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  checkDuplicateUsernameOrEmail,
};
