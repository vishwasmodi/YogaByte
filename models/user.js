const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxlength: 50,
  },
  username: {
    type: String,
    require: true,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 100,
  },
  days: [
    {
      type: Number,
      required: true,
    },
  ],
});

const { JWT_PK } = process.env;
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_PK);
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().max(255).required().email(),
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    Date: Joi.array(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
