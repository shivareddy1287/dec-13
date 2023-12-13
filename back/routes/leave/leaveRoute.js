const express = require("express");
const {
  applyLeaveCtrl,
  updateLeaveCtrl,
  approveLeaveCtrl,
  cancelLeaveCtrl,
  fetchAllLeaves,
  fetchLeave,
  deleteLeaveCtrl,
} = require("../../controllers/leave/leaveCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const leaveRoute = express.Router();

leaveRoute.post("/", authMiddleware, applyLeaveCtrl);
leaveRoute.put("/update/:id", authMiddleware, updateLeaveCtrl);
leaveRoute.put("/:id", authMiddleware, approveLeaveCtrl);
leaveRoute.put("/cancelLeave/:id", authMiddleware, cancelLeaveCtrl);
leaveRoute.get("/", authMiddleware, fetchAllLeaves);
leaveRoute.delete("/:id", authMiddleware, deleteLeaveCtrl);
leaveRoute.get("/:id", authMiddleware, fetchLeave);

module.exports = leaveRoute;
