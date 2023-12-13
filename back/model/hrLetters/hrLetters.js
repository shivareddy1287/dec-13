const mongoose = require("mongoose");

const userDocumentsSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      // required: [true, "Employee Id is required"],
    },
    documentName: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: [true, "User is required"],
      ref: "User",
    },
    document: {
      type: mongoose.Schema.Types.Buffer,
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

const UserDocuments = mongoose.model("UserDocuments", userDocumentsSchema);

module.exports = UserDocuments;
