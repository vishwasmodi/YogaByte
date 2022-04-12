const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// For Signup
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = User.find({ email: req.body.email });
  if (user.email) return res.status(400).send("User already registered..");

  user = User.find({ username: req.body.username });
  if (user.username) return res.status(400).send("Username already taken");

  user = new User(
    _.pick(req.body, ["name", "username", "email", "password", "days"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res.send({
    token: token,
    name: user.name,
    userId: user._id,
    username: user.username,
  });
});

module.exports = router;
