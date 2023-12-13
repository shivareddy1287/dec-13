const express = require("express");
const {
  addholidayCtrl,
  fetchholidaysCtrl,
  fetchHolidayCtrl,
  updateHolidayCtrl,
  deleteHolidayCtrl,
} = require("../../controllers/holiday/holidayCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const holidayRoute = express.Router();

holidayRoute.post("/", authMiddleware, addholidayCtrl);
holidayRoute.get("/", authMiddleware, fetchholidaysCtrl);
holidayRoute.get("/:id", authMiddleware, fetchHolidayCtrl);
holidayRoute.delete("/:id", authMiddleware, deleteHolidayCtrl);
holidayRoute.put("/update/:id", authMiddleware, updateHolidayCtrl);

module.exports = holidayRoute;
