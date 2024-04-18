const express = require("express");
const router = express.Router();
const {
  SignIn,
  Signup,
  AddMissing,
  AllMisingPeople,
} = require("../controllers/user");

router.post("/signin", SignIn);
router.post("/signup", Signup);
router.post("/add/missing", AddMissing);
router.get("/api/missing", AllMisingPeople);

module.exports = router;
