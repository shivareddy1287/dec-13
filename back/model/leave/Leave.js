const mongoose = require("mongoose");

//create Schema

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      // required: [true, "Employee Id is Required"],
    },
    leaveType: {
      type: String,
      // required: [true, "Leave Category is required"],
    },
    fromDate: {
      type: Date,
      // required: [true, "From date is required "],
    },
    reasonForRejection: {
      type: String,
    },
    toDate: {
      type: Date,
      // required: [true, "To date is required "],
    },
    emailId: {
      type: String,
      // required: [true, "Email is required "],
    },
    reasonForLeave: {
      type: String,
      // required: [true, "Reason for leave is required"],
    },

    askLeaveFor: {
      type: String,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
    isRejected: {
      type: Boolean,
      default: false,
    },
    userMangagerId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userManagerName: {
      type: String,
    },
    leaveStatus: {
      type: String,
      default: "Pending",
      // required: [true, "Leave status is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: [true, "User is required"],
      ref: "User",
    },
    numOfDays: {
      type: Number,
    },
    appliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      // required: [true, "Applied by is required"],
      ref: "User",
    },
    // casualLeaves: {
    //   type: Number,
    //   default: 12,
    // },
    // EarnedLeaves: {
    //   type: Number,
    //   default: 0,
    // },
    // leavesWithoutPay: {
    //   type: Number,
    //   default: 0,
    // },
    // PaternityLeaves: {
    //   type: Number,
    //   default: 0,
    // },
    // SubbaticalLeaves: {
    //   type: Number,
    //   default: 0,
    // },
    // SickLeaves: {
    //   type: Number,
    //   default: 12,
    // },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
