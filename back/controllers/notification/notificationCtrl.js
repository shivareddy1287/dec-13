const expressAsyncHandler = require("express-async-handler");
const Notification = require("../../model/notification/notification");

const addNotificationCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const notification = await Notification.create({
      ...req.body,
    });

    res.json(notification);
  } catch (error) {
    res.json(error);
  }
});

const fetchNotificationsCtrl = expressAsyncHandler(async (req, res) => {
  const userId = req.query.userId;
  console.log("Fetch notifications triggered", userId);

  try {
    // const notifications = await Notification.find({})
    const notifications = await Notification.find({ user: userId })
      .sort("-createdAt")
      .populate("user");
    res.json(notifications);
  } catch (error) {
    res.json(error);
  }
});

module.exports = { addNotificationCtrl, fetchNotificationsCtrl };
