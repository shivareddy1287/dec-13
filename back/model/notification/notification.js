const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, "EmpoyeeId is required"],
    },
    employeeName: {
      type: String,
      required: [true, "EmpoyeeName is required"],
    },
    notificationTitle: {
      type: String,
      required: [true, "NotificationTitle is required"],
    },
    notificationDescription: {
      type: String,
      required: [true, "NotificationDescription is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: [true, "User is required"],
      ref: "User",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJson: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
