const express = require("express");

const authMiddleware = require("../../middlewares/auth/authMiddleware");

const {
  createExitDetailsCtrl,
  fetchExitDetailssCtrl,
  fetchSingleExitDetails,
  updateExitDetailsCtrl,
  deleteExitDetailsCtrl,
} = require("../../controllers/exitDetails/exitDetailsCtrl");

const exitDetailsRoute = express.Router();
exitDetailsRoute.post("/create", authMiddleware, createExitDetailsCtrl);
exitDetailsRoute.get("/fetch", authMiddleware, fetchExitDetailssCtrl);
exitDetailsRoute.get("/fetch/:id", authMiddleware, fetchSingleExitDetails);
exitDetailsRoute.put("/update/:id", authMiddleware, updateExitDetailsCtrl);
exitDetailsRoute.delete("/fetch/:id", authMiddleware, deleteExitDetailsCtrl);
module.exports = exitDetailsRoute;
