const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAlluser,
  getSingleuser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticationUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/logout", logout);
router.get("/me", isAuthenticationUser, getUserDetails);
router.put("/password/update", isAuthenticationUser, updatePassword);
router.put("/me/update", isAuthenticationUser, updateProfile);
router.get(
  "/admin/users",
  isAuthenticationUser,
  authorizeRoles("admin"),
  getAlluser
);
router
  .get(
    "/admin/user/:id",
    isAuthenticationUser,
    authorizeRoles("admin"),
    getSingleuser
  )
  .put("/admin/user/:id",isAuthenticationUser, authorizeRoles("admin"), updateUserRole)
  .delete("/admin/user/:id",isAuthenticationUser, authorizeRoles("admin"), deleteUser);

  
module.exports = router;
