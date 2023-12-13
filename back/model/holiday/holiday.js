const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    fromDate: {
      type: Date,
      required: [true, "From date is required"],
    },
    toDate: {
      type: Date,
      required: [true, "To date is required"],
    },
    applicableFor: {
      type: String,
      required: [true, "Applicable for is required"],
    },
    shifts: {
      type: String,
      required: [true, "Shifts is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
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

const Holiday = mongoose.model("holiday", holidaySchema);
module.exports = Holiday;
