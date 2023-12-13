const generateToken = require("../../config/token/generateToken");

const expressAsyncHandler = require("express-async-handler");
const validateMongodbID = require("../../utils/validateMongodbID");

const ExitDetails = require("../../model/exitDetails/ExitDetails");

//----------------------------------------------------------------
// create ExitDetails
//----------------------------------------------------------------

const createExitDetailsCtrl = expressAsyncHandler(async (req, res) => {
  // Business Logic
  console.log(req?.body, "created");
  try {
    const user = await ExitDetails.create({
      ...req?.body,
    });
    res.json(user);

    // res.json("user controllers");
  } catch (error) {
    res.json(error);
  }
  // try {
  //   const ExitDetails = await ExitDetails.create({ user: userId, addedBy: adminId });
  //   res.json(ExitDetails);
  // } catch (error) {
  //   console.error(error);
  //   res.json(error);
  // }
});

//----------------------------------------------------------------
// Fetch ExitDetailss
//----------------------------------------------------------------

const fetchExitDetailssCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.query.id;
  const query = {}; // Initialize an empty query object

  if (id) {
    query.user = id; // Add a filter for the user ID if provided
  }
  try {
    const ExitDetailss = await ExitDetails.find(query)
      .populate("user")
      .populate("addedBy")
      .populate("ModifiedBy")
      .populate("Interviewer");
    res.json(ExitDetailss);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// user details
//----------------------------------------------------------------

const fetchSingleExitDetails = expressAsyncHandler(async (req, res) => {
  // console.log(req.headers);
  const { id } = req.params;
  validateMongodbID(id);

  try {
    const user = await ExitDetails.findById(id)
      .populate("user")
      .populate("addedBy")
      .populate("ModifiedBy")
      .populate("Interviewer");

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// Update ExitDetails
//----------------------------------------------------------------

const updateExitDetailsCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req?.params?.id, "params");
  // const { _id } = req?.user;
  console.log(req?.body, "req?.body");

  // validateMongodbID(_id);
  try {
    const user = await ExitDetails.findByIdAndUpdate(
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

const deleteExitDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  console.log(id);
  // if (!id) throw new Error("Please provide user ID");

  // check isf user id is valid
  validateMongodbID(id);
  try {
    const deletedUser = await ExitDetails.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = {
  createExitDetailsCtrl,
  fetchExitDetailssCtrl,
  fetchSingleExitDetails,
  updateExitDetailsCtrl,
  deleteExitDetailsCtrl,
};
