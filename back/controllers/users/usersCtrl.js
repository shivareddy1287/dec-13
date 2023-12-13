const User = require("../../model/user/User");

const expressAsyncHandler = require("express-async-handler");
const validateMongodbID = require("../../utils/validateMongodbID");
const sendEmail = require("../../utils/sendEmail");

const Token = require("../../model/token/tokenModel");

const bcrypt = require("bcryptjs");
const { generateToken, hashToken } = require("../../utils");
var parser = require("ua-parser-js");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const generateLoginToken = require("../../utils/token/generateLoginToken");
const sendEmailWithUser = require("../../utils/sendEmailWithUser");
const {
  backNormalAdminAccessGivenFun,
} = require("../../utils/restrictBack/restrictedAccessBack");
// const Cryptr = require("cryptr");

// const cryptr = new Cryptr(process.env.CRYPTR_KEY);

//----------------------------------------------------------------
// Register
//----------------------------------------------------------------

const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  // Business Logic

  const userExists = await User.findOne({ email: req?.body?.email });
  if (userExists) throw new Error("User already exists");

  try {
    const user = await User.create({
      ...req?.body,
    });
    res.json(user);

    // res.json("user controllers");
  } catch (error) {
    res.json(error);
  }
});
//----------------------------------------------------------------
// Login User
//----------------------------------------------------------------
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const userFound = await User.findOne({ email })
    .populate("addedBy")
    .populate("ModifiedBy")
    .populate("managerDataId");

  if (!userFound) {
    res.status(401);
    throw new Error("Invalid login credentials");
  }
  // check if password is match
  const token = generateToken(userFound?._id);
  if (userFound && (await userFound.isPasswordMatched(password))) {
    // Send HTTP-only cookie
    console.log(token, "login token");
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    // res.cookie("token", token, {
    //   path: "/",
    //   httpOnly: true,
    //   expires: new Date(Date.now() + 1000 * 86400), // 1 day
    // });

    const { password, ...userWithoutPassword } = userFound._doc;
    res.json(userWithoutPassword);
  } else {
    res.status(401);
    throw new Error("Invalid login credentials");
  }

  // if (userFound && (await userFound.isPasswordMatched(password))) {
  //   res.json(userFound);
  // } else {
  //   res.status(401);
  //   throw new Error("Invalid login credentials");
  // }
});

//----------------------------------------------------------------
// Get Login Status
//----------------------------------------------------------------
const loginStatus = expressAsyncHandler(async (req, res) => {
  console.log("ok loginstatus", req.cookies);
  const token = req.cookies.token;

  console.log(token, "token");
  if (!token) {
    return res.json(false);
  }

  // Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  }
  return res.json(false);
  // res.send("login status");
});

//----------------------------------------------------------------
// set the local host data updated
//----------------------------------------------------------------

const setLocalHostUserAuthDetails = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req?.user?.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// Logout User
//----------------------------------------------------------------

const logoutUser = expressAsyncHandler(async (req, res) => {
  console.log("logout token");
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 1 day
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Logout successful" });
});

//----------------------------------------------------------------
// Fetch Users
//----------------------------------------------------------------

const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  // const isAdmin = backNormalAdminAccessGivenFun(req?.user?.Access);
  // const query = isAdmin ? {} : { _id: req?.user?.id };
  // try {
  //   const users = await User.find(query)
  //     .populate("addedBy")
  //     .populate("ModifiedBy")
  //     .populate("managerDataId")
  //     .populate("leaves")
  //     .populate("userDocuments")
  //     .populate("attendence");
  //   res.json(users);
  // } catch (error) {
  //   console.log(error);
  // }

  try {
    const users = await User.find({})
      .populate("addedBy")
      .populate("ModifiedBy")
      .populate("managerDataId")
      .populate("leaves")
      .populate("userDocuments")
      .populate("attendence");
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// user details
//----------------------------------------------------------------

const fetchUserDetails = expressAsyncHandler(async (req, res) => {
  console.log(req?.user, "fetch single user details");
  const { id } = req.params;
  validateMongodbID(id);

  // validateMongodbID(id);

  try {
    const user = await User.findById(id)
      .populate("addedBy")
      .populate("ModifiedBy")
      .populate("managerDataId")
      .populate("leaves")
      .populate("userDocuments")
      .populate("attendence")
      .select("-password");
    console.log(user, "user ======================");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// Update profile
//----------------------------------------------------------------

const updateUserctrl = expressAsyncHandler(async (req, res) => {
  console.log(req?.params?.id, "params");
  // const { _id } = req?.user;
  // console.log(_id, "_id");

  // validateMongodbID(_id);
  try {
    const user = await User.findByIdAndUpdate(
      req?.params?.id,
      {
        ...req?.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//----------------------------------------------------------------
// delete the user
//----------------------------------------------------------------

const deleteProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  console.log(id);
  // if (!id) throw new Error("Please provide user ID");

  // check isf user id is valid
  // validateMongodbID(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//----------------------------------------------------------------
// Fetch New Hires
//----------------------------------------------------------------

const newHiresFetchCtrl = expressAsyncHandler(async (req, res) => {
  console.log("fetch new hires");
  try {
    const currentDate = new Date();
    const newHireCutoff = new Date(); // Define the cutoff date (e.g., 30 days ago)
    newHireCutoff.setDate(newHireCutoff.getDate() - 30);
    console.log(currentDate, "currentDate date");
    console.log(newHireCutoff, "newHireCutoff 99999999999999999999");
    const newHires = await User.find({
      // hireDate: { $gte: newHireCutoff, $lte: currentDate },
      "workInformation.dateOfJoining": {
        $gte: newHireCutoff,
        $lte: currentDate,
      },
    })
      .populate("addedBy")
      .populate("ModifiedBy");
    const oldEmployees = await User.find({
      "workInformation.dateOfJoining": { $lt: newHireCutoff },
    })
      .populate("addedBy")
      .populate("ModifiedBy");

    res.json({ oldEmployees, newHires });
  } catch (error) {
    console.log(error);
  }
});

const newHiresFetchCtrl2 = expressAsyncHandler(async (req, res) => {
  console.log("fetch new hires");
  try {
    // const users = await User.find({})
    //   .populate("addedBy")
    //   .populate("ModifiedBy");
    // res.json(users);

    const currentDate = new Date();
    const newHireCutoff = new Date(); // Define the cutoff date (e.g., 30 days ago)
    newHireCutoff.setDate(newHireCutoff.getDate() - 365);
    console.log(currentDate, "currentDate date");
    console.log(newHireCutoff, "newHireCutoff 99999999999999999999");
    const newHires = await User.find({
      // hireDate: { $gte: newHireCutoff, $lte: currentDate },
      "workInformation.dateOfJoining": {
        $gte: newHireCutoff,
        $lte: currentDate,
      },
    })
      .populate("addedBy")
      .populate("ModifiedBy");
    // const oldEmployees = await User.find({
    //   "workInformation.dateOfJoining": { $lt: newHireCutoff },
    // })
    //   .populate("addedBy")
    //   .populate("ModifiedBy");

    res.json(newHires);
  } catch (error) {
    console.log(error);
  }
});

// Forgot Password
const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email, "email");

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("No user with this email");
  }

  // Delete Token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  //   Create Verification Token and Save
  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);

  // Hash token and save
  const hashedToken = hashToken(resetToken);
  await new Token({
    userId: user._id,
    rToken: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
  }).save();

  // Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  // Send Email
  const subject = "Password Reset Request - AUTH:Z";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@zino.com";
  const template = "forgotPassword";
  const name = user.name;
  const link = resetUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Password Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// Reset Password
const resetPassword = expressAsyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  console.log(resetToken);
  console.log(password);

  const hashedToken = hashToken(resetToken);

  const userToken = await Token.findOne({
    rToken: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find User
  const user = await User.findOne({ _id: userToken.userId });

  // Now Reset password
  user.password = password;
  await user.save();

  res.status(200).json({ message: "Password Reset Successful, please login" });
});

// Change Password
const changePassword = expressAsyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body;
  // console.log(req?.user, "user id");
  // console.log(oldPassword, password, "Change Password");
  const user = await User.findById(req?.user?._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please enter old and new password");
  }

  console.log("change password called");

  // const subject = "sendEmailWithUser - AUTH:Z";
  // const send_to = "blissauth@outlook.com";
  // const sent_from = "shivareddy1287@outlook.com";
  // const reply_to = "noreply@zino.com";
  // const template = "forgotPassword";
  // const name = user.name;
  // const link = resetUrl;

  // await sendEmailWithUser(
  //   subject,
  //   send_to,
  //   sent_from,
  //   reply_to,
  //   template,
  //   name,
  //   link
  // );
  res.status(200).json({ message: "Password changed Email Sent" });

  // Check if old password is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();

    res
      .status(200)
      .json({ message: "Password change successful, please re-login" });
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

// Send Automated emails
const sendAutomatedEmail = expressAsyncHandler(async (req, res) => {
  const { subject, send_to, reply_to, template, url } = req.body;

  if (!subject || !send_to || !reply_to || !template) {
    res.status(500);
    throw new Error("Missing email parameter");
  }

  // Get user
  const user = await User.findOne({ email: send_to });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const sent_from = process.env.EMAIL_USER;
  const name = user.name;
  const link = `${process.env.FRONTEND_URL}${url}`;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

//----------------------------------------------------------------
// Fetch Managers Data
//----------------------------------------------------------------

const fetchManagersData = expressAsyncHandler(async (req, res) => {
  try {
    const managers = await User.find({ Access: "Manager" }).populate(
      "managerDataId"
    );
    res.json(managers);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  loginUserCtrl,
  userRegisterCtrl,
  fetchUsersCtrl,
  fetchUserDetails,
  updateUserctrl,
  deleteProfileCtrl,
  newHiresFetchCtrl,
  forgotPassword,
  resetPassword,
  changePassword,
  sendAutomatedEmail,
  fetchManagersData,
  logoutUser,
  loginStatus,
  setLocalHostUserAuthDetails,
};

// const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
//   try {
//     const users = await User.find({})
//       .populate("addedBy")
//       .populate("ModifiedBy")
//       .populate("userDocuments")
//       .populate("attendence");
//     res.json(users);
//   } catch (error) {
//     console.log(error);
//   }
// });

// //----------------------------------------------------------------
// // user details
// //----------------------------------------------------------------

// const fetchUserDetails = expressAsyncHandler(async (req, res) => {
//   // console.log(req.headers);
//   const { id } = req.params;
//   validateMongodbID(id);

//   try {
//     const user = await User.findById(id)
//       .populate("addedBy")
//       .populate("ModifiedBy")
//       .populate("leaves")
//       .populate("userDocuments")
//       .populate("attendence");
//     // .populate("notifications");
//     res.json(user);
//   } catch (error) {
//     console.log(error);
//   }
// });
