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
exitDetailsRoute.post("/create", createExitDetailsCtrl);
exitDetailsRoute.get("/fetch", fetchExitDetailssCtrl);
exitDetailsRoute.get("/fetch/:id", fetchSingleExitDetails);
exitDetailsRoute.put("/update/:id", updateExitDetailsCtrl);
exitDetailsRoute.delete("/fetch/:id", deleteExitDetailsCtrl);
module.exports = exitDetailsRoute;
