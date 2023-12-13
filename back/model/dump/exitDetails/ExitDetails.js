const mongoose = require("mongoose");

// create a schema
const ExitDetailsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Separation
    separationDate: String,
    Interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    ReasonForLeaving: String,

    //   Questionairre
    WorkingforthisOrganizationAgain: String,
    Thinktheorganizationdotoimprovestaffwelfare: String,
    Whatdidyoulikethemostoftheorganization: String,
    Anythingyouwishtosharewithus: String,

    //   Checklist for Exit Interview
    CompanyVehiclehandedin: String,
    Alllibrarybookssubmitted: String,
    Exitinterviewconducted: String,
    Resignationlettersubmitted: String,
    Allequipmentshandedin: String,
    Security: String,
    Noticeperiodfollowed: String,
    ManagerSupervisorclearance: String,

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

const ExitDetails = mongoose.model("ExitDetails", ExitDetailsSchema);

module.exports = ExitDetails;
