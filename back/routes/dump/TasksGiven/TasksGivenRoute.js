const express = require("express");

const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  createTasksGivenCtrl,
  fetchTasksGivensCtrl,
  fetchSingleTasksGiven,
  updateTasksGivenCtrl,
  deleteTasksGivenCtrl,
} = require("../../controllers/TasksGivenCtrl/TasksGivenCtrl");

const TasksGivenRoutes = express.Router();
TasksGivenRoutes.post("/create", createTasksGivenCtrl);
TasksGivenRoutes.get("/fetch", fetchTasksGivensCtrl);
TasksGivenRoutes.get("/fetch/:id", fetchSingleTasksGiven);
TasksGivenRoutes.put("/update/:id", updateTasksGivenCtrl);
TasksGivenRoutes.delete("/fetch/:id", deleteTasksGivenCtrl);
module.exports = TasksGivenRoutes;
