

const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails } = require("../controllers/userController");
const {isAuthenticationUser}=require("../middleware/auth");

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token",resetPassword);
router.get("/logout",logout);
router.get("/me",isAuthenticationUser,getUserDetails);

module.exports= router;