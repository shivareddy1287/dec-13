const mongoose = require("mongoose");

const TasksGivenSchema = new mongoose.Schema(
  {
    taskGivenUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    taskAssignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    taskName: String,
    taskDescription: String,
    startDate: Date,
    dueDate: Date,
    Importance: String,
    Status: String,
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

// Compile Schema into model

const TasksGiven = mongoose.model("TasksGiven", TasksGivenSchema);

module.exports = TasksGiven;
