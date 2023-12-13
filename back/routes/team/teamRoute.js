const express = require("express");

const authMiddleware = require("../../middlewares/auth/authMiddleware");

const {
  createTeamCtrl,
  fetchTeamsCtrl,
  fetchSingleTeam,
  updateTeamCtrl,
  deleteTeamCtrl,
} = require("../../controllers/team/teamCtrl");

const TeamRoutes = express.Router();
TeamRoutes.post("/create", authMiddleware, createTeamCtrl);
TeamRoutes.get("/fetch", authMiddleware, fetchTeamsCtrl);
TeamRoutes.get("/fetch/:id", authMiddleware, fetchSingleTeam);
TeamRoutes.put("/update/:id", authMiddleware, updateTeamCtrl);
TeamRoutes.delete("/fetch/:id", authMiddleware, deleteTeamCtrl);
module.exports = TeamRoutes;
