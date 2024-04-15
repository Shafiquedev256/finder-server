const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bycrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
});

userSchema.statics.signup = async function (
  email,
  fullName,
  userName,
  location,
  password
) {
  if (!email || !fullName || !userName || !location || !password) {
    throw Errow("All fields must be provided");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is invalid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const userNameexists = await this.findOne({ userName });
  if (userNameexists) {
    throw Error("User name is already taken !");
  }

  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);
  const user = await this.create({
    email,
    fullName,
    userName,
    location,
    password: hash,
  });
  return user;
};

userSchema.statics.signin = async function (userName, password) {
  if (!userName || !password) {
    throw Errow("All fields must be provided");
  }
  const user = await this.findOne({ userName });
  if (!user) {
    throw Error("Invalid user name!");
  }
  const compare = await bycrypt.compare(password, user.password);
  if (!compare) {
    throw Error("Invalid user password");
  }
  return user;
};

module.exports = mongoose.model("Finder", userSchema);
