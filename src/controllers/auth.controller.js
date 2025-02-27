const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const Role = require("../models/role.model");

class AuthController {
  async signup(req, res) {
    try {
      const { username, email, password, role, firstname, lastname, address } =
        req.body;

      const user = await User.create({
        username,
        email,
        firstname,
        lastname,
        address,
        password: bcrypt.hashSync(password, 8),
      });

      if (role) {
        const roleRecord = await Role.findOne({
          name: role,
        });
        user.role = roleRecord._id;
        await user.save();
      } else {
        const defaultRole = await Role.findOne({ name: "CUSTOMER" });
        user.role = defaultRole._id;
        await user.save();
      }

      res.send({ message: "User registered successfully!" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async signin(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username }).populate("role");

      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid password!" });
      }

      const token = jwt.sign({ user }, process.env.JWT_SECRET);

      res.status(200).send({ token: token });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async signout(req, res) {
    try {
      res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
}

module.exports = new AuthController();
