const express = require("express");
const {
  addNotificationCtrl,
  fetchNotificationsCtrl,
} = require("../../controllers/notification/notificationCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const notificationRoute = express.Router();

notificationRoute.post("/", authMiddleware, addNotificationCtrl);
notificationRoute.get("/", authMiddleware, fetchNotificationsCtrl);

module.exports = notificationRoute;
