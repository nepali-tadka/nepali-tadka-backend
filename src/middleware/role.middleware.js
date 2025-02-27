const User = require("../models/user.model");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("role");
    if (user.role.name !== "ADMIN") {
      return res.status(403).json({ message: "Require Admin Role!" });
    }
    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  isAdmin,
};
