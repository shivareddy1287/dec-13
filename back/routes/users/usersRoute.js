const express = require("express");
const {
  loginUserCtrl,
  userRegisterCtrl,
  fetchUsersCtrl,
  fetchUserDetails,
  updateUserctrl,
  deleteProfileCtrl,
  newHiresFetchCtrl,
  forgotPassword,
  resetPassword,
  changePassword,
  sendAutomatedEmail,
  fetchManagersData,
  logoutUser,
  loginStatus,
  setLocalHostUserAuthDetails,
} = require("../../controllers/users/usersCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/register", authMiddleware, userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get(
  "/local/storage/data",
  authMiddleware,
  setLocalHostUserAuthDetails
);

userRoutes.get("/", authMiddleware, fetchUsersCtrl);

userRoutes.get("/:id", authMiddleware, fetchUserDetails);
userRoutes.put("/update/:id", authMiddleware, updateUserctrl);
userRoutes.delete("/delete/:id", authMiddleware, deleteProfileCtrl);
userRoutes.get("/new/hires", authMiddleware, newHiresFetchCtrl);
userRoutes.post("/forgotPassword", forgotPassword);
userRoutes.post("/resetPassword/:resetToken", resetPassword);
userRoutes.patch("/changePassword", authMiddleware, changePassword);
userRoutes.post("/sendAutomatedEmail", authMiddleware, sendAutomatedEmail);
userRoutes.get("/manager/data", authMiddleware, fetchManagersData);

userRoutes.get("/login/loginStatus", loginStatus);
userRoutes.get("/logout/user", logoutUser);

module.exports = userRoutes;
