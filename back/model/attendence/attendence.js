const mongoose = require("mongoose");

const attendenceSchema = new mongoose.Schema({
  employeeId: {
    type: String,
  },
  date: {
    type: Date,
  },
  punchIn: {
    type: String,
    default: "",
  },
  punchOut: {
    type: String,
    default: "",
  },
  duration: {
    type: Number,
    default: 0,
  },
  workFrom: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: String,
  },
});

const Attendence = mongoose.model("Attendence", attendenceSchema);

module.exports = Attendence;
