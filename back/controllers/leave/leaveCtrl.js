const expressAsyncHandler = require("express-async-handler");
const Leave = require("../../model/leave/Leave");
const Notification = require("../../model/notification/notification");
const User = require("../../model/user/User");

const applyLeaveCtrl = expressAsyncHandler(async (req, res) => {
  // console.log(req.user);
  console.log("apply leave triggered");
  // const userId = req.user._id;

  // console.log(userId);

  const employeeIdd = req.body.employeeId;
  console.log("employeeId", employeeIdd);

  const user = await User.findById(employeeIdd);
  // console.log("userr", user);
  // console.log(req.body);

  const notificationData = {
    employeeId: req.body.employeeId,
    employeeName: `${user.basicInformation.firstName} ${user.basicInformation.lastName}`,
    notificationTitle: `Applied ${req.body.leaveType}`,
    notificationDescription: `Applied  ${req.body.leaveType}  for ${req.body.fromDate} to ${req.body.toDate}`,
    user: req.body.userMangagerId,
  };

  const notification = await Notification.create(notificationData);
  console.log("1");

  try {
    const leave = await Leave.create({
      ...req.body,
      // user: ObjectId(req.body.user),
      user: req.body.employeeId,
      // appliedBy: userId,
    });
    console.log("leave");

    res.json(leave);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

const updateLeaveCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  // console.log(req.body);
  try {
    const leave = await Leave.findByIdAndUpdate(id, { ...req.body });
    res.json(leave);
  } catch (error) {
    res.json(error.message);
  }
});

const approveLeaveCtrl = expressAsyncHandler(async (req, res) => {
  console.log("req.body");
  const id = req.params.id;
  try {
    const leave = await Leave.findById(id);
    if (leave && !leave.isApproved) {
      // const leaveCat = leave.leaveType;
      leave.leaveStatus = "Approved";
      // console.log(leaveCat);
      // leave[leaveCat] += 1;
      leave.isApproved = true;
      await leave.save();
      console.log("leave.user", leave.user);
      let leaveCat = "s";
      if (leave.leaveType === "casual Leave") {
        leaveCat = "casualLeaves";
      } else if (leave.leaveType === "sick Leave") {
        leaveCat = "sickLeaves";
      }

      console.log(leaveCat);

      const numOfDays = leave.numOfDays;
      // console.log(leaveCat);
      console.log("leaveCat", leaveCat);
      const leaveCountDecrement = await User.findByIdAndUpdate(
        leave.user, // Use leave.employeeId to find the user
        {
          $inc: { [leaveCat]: -numOfDays },
        },
        { new: true }
      );
      console.log("test user", leave.user);

      const notificationData = {
        employeeId: leave.employeeId,
        notificationTitle: `Approved Leave on${leave.fromDate}`,
        notificationDescription: `Approved ${leave.leaveType} on ${leave.fromDate} to ${leave.toDate}`,
        user: leave.user,
      };

      const notification = await Notification.create(notificationData);

      res.json(leave);
    } else if (leave && leave.isApproved) {
      res.json("Leave already Approved");
    }
  } catch (error) {
    res.json(error);
  }
});

const cancelLeaveCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  try {
    const leave = await Leave.findByIdAndUpdate(
      id,
      {
        leaveStatus: "Canceled",
        isRejected: true,
        reasonForRejection: req.body.reasonForLeave,
      },
      { new: true }
    );
    res.json(leave);
  } catch (error) {
    res.json(error);
  }
});

const fetchAllLeaves = expressAsyncHandler(async (req, res) => {
  try {
    const allLeaves = await Leave.find({})
      .populate("user")
      .sort({ createdAt: -1 });

    res.json(allLeaves);
  } catch (error) {
    res.json(error);
  }
});

const fetchLeave = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  // console.log(typeof id);
  // console.log(id);

  try {
    const leave = await Leave.findById(id)
      .populate("user")
      .populate("appliedBy");
    // console.log("Leave", leave);
    res.json(leave);
  } catch (error) {
    res.json(error);
  }
});

// Delete Leave
const deleteLeaveCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const leave = await Leave.findByIdAndDelete(id);
    console.log(leave);
    res.json(leave);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  applyLeaveCtrl,
  updateLeaveCtrl,
  approveLeaveCtrl,
  cancelLeaveCtrl,
  fetchAllLeaves,
  fetchLeave,
  deleteLeaveCtrl,
};
