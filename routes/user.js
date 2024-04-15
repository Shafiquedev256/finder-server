const express = require("express");
const router = express.Router();
const { SignIn, Signup } = require("../controllers/user");

router.post("/signin", SignIn);
router.post("/signup", Signup);

module.exports = router;
