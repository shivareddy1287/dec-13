const mongoose = require("mongoose");
// Employee ID	Given date	Asset details	Type of asset	Return date	Added By	Added Time	Modified By	Modified Time
// Balaji Chavuturu BSS140	09-Oct-2023	computer	Computer	11-Oct-2023	BSS001 - BUSINESSLIKE - ADMIN	09-Oct-2023 10:42 AM	BSS001 - BUSINESSLIKE - ADMIN	09-Oct-2023 10:42 AM
//  Asset

// create a schema
const AssetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    givenDate: Date,
    assetDetails: String,
    typeOfAsset: String,
    returnDate: Date,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    addedTime: Date,
    ModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    modifiedTime: Date,
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

const Asset = mongoose.model("Asset", AssetSchema);

module.exports = Asset;
