const express = require("express");
const {
  attendenceCheckInCtrl,
} = require("../../controllers/attendence/attendenceCtrl");

const attendenceRoute = express.Router();
const authMiddleware = require("../../middlewares/auth/authMiddleware");

attendenceRoute.post("/", authMiddleware, attendenceCheckInCtrl);

module.exports = attendenceRoute;
