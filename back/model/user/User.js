const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

// create a schema
const userSchema = new mongoose.Schema(
  {
    profilePhoto: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Hey Buddy Password is required"],
    },
    managerDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Access: String,
    ProjectTeam: String,
    ProfileEditAccess: {
      type: String,
      default: "Deny",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Blogger"],
    },
    basicInformation: {
      firstName: String,
      lastName: String,
      employerId: String,
      email: String,
    },
    personalDetails: {
      dateOfBirth: Date,
      gender: String,
      age: Number,
      maritalStatus: String,
      aboutMe: String,
    },
    workInformation: {
      Department: String,
      location: String,
      designation: String,
      appRole: String,
      employmentType: String,
      employeeStatus: String,
      sourceOfHire: String,
      dateOfJoining: Date,
      currentExperience: String,
      totalExperience: String,
    },
    identityInfo: { uan: String, pan: String, adhaar: String },
    contactDetails: {
      workNumber: Number,
      personalNumber: Number,
      emailAddress: String,
      presentAddress: String,
      permanentAddress: String,
    },
    hireDate: Date,
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
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

    // new
    casualLeaves: {
      type: Number,
      default: 12,
    },
    earnedLeaves: {
      type: Number,
      default: 0,
    },
    leavesWithoutPay: {
      type: Number,
      default: 0,
    },
    paternityLeaves: {
      type: Number,
      default: 0,
    },
    subbaticalLeaves: {
      type: Number,
      default: 0,
    },
    sickLeaves: {
      type: Number,
      default: 12,
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

// Virtual method to populate Leaves
userSchema.virtual("leaves", {
  ref: "Leave",
  foreignField: "user",
  localField: "_id",
});

//Virtual method to populate Notifications
userSchema.virtual("notifications", {
  ref: "Notification",
  foreignField: "user",
  localField: "_id",
});

//Virtual method to populate userDocuments
userSchema.virtual("userDocuments", {
  ref: "UserDocuments",
  foreignField: "user",
  localField: "_id",
});

//Virtual method to populate attendence
userSchema.virtual("attendence", {
  ref: "Attendence",
  foreignField: "user",
  localField: "_id",
});

// Virtual method to populate created asset
userSchema.virtual("assets", {
  ref: "Assets",
  foreignField: "user",
  localField: "_id",
});

// // Account Type
// userSchema.virtual("accountType").get(function () {
//   const totalFollowers = this.followers?.length;

//   return totalFollowers >= 1 ? "Pro Account" : "Starter Account";
// });

// Hash password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("is modified");
    next();
  }
  // console.log(this);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Compile Schema into model

const User = mongoose.model("User", userSchema);

module.exports = User;
