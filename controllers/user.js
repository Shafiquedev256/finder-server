const User = require("../models/user");
const Missings = require("../models/post");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRETE, { expiresIn: "3d" });
};

//sing in user
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

//sign up user
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

// post missing person
const AddMissing = async (req, res) => {
  const {
    url,
    fullName,
    age,
    gender,
    lastSeenLocation,
    dateLastSeen,
    description,
    contactName,
    contactNumber,
  } = req.body;
  try {
    const missing = await new Missings({
      url,
      fullName,
      age,
      gender,
      lastSeenLocation,
      dateLastSeen,
      description,
      contactName,
      contactNumber,
    });

    const save = await missing.save();

    res.status(200).json({ message: "Person uploaded " });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all missing people

const AllMisingPeople = async (req, res) => {
  try {
    const missing = await Missings.find();
    res.json(missing);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { SignIn, Signup, AddMissing, AllMisingPeople };
