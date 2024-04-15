const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRETE, { expiresIn: "3d" });
};

const SignIn = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const UserEl = await User.signin(userName, password);
    const token = await createToken(UserEl._id);
    res.status(200).json({ userName: UserEl.userName, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const Signup = async (req, res) => {
  const { email, fullName, userName, location, password } = req.body;
  try {
    const user = await User.signup(
      email,
      fullName,
      userName,
      location,
      password
    );
    const token = await createToken(user._id);
    res.status(200).json({ userName, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { SignIn, Signup };
