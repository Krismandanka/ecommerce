

const express = require("express");
const { registerUser, loginUser, logout, forgotPassword } = require("../controllers/userController");


const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/password/forgot",forgotPassword);
router.get("/logout",logout);

module.exports= router;