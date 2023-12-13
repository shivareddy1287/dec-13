const generateToken = require("../../config/token/generateToken");

const expressAsyncHandler = require("express-async-handler");
const validateMongodbID = require("../../utils/validateMongodbID");
const Designation = require("../../model/designation/Designation");

//----------------------------------------------------------------
// create Designation
//----------------------------------------------------------------

const createDesignationCtrl = expressAsyncHandler(async (req, res) => {
  // Business Logic
  console.log(req?.body, "created");
  try {
    const user = await Designation.create({
      ...req?.body,
    });
    res.json(user);

    // res.json("user controllers");
  } catch (error) {
    res.json(error);
  }
});

//----------------------------------------------------------------
// Fetch Designations
//----------------------------------------------------------------

const fetchDesignationsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const Designations = await Designation.find({})
      .populate("addedBy")
      .populate("ModifiedBy");
    res.json(Designations);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// user details
//----------------------------------------------------------------

const fetchSingleDesignation = expressAsyncHandler(async (req, res) => {
  // console.log(req.headers);
  const { id } = req.params;
  validateMongodbID(id);

  try {
    const user = await Designation.findById(id)

      .populate("addedBy")
      .populate("ModifiedBy");

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// Update Designation
//----------------------------------------------------------------

const updateDesignationCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req?.params?.id, "params");
  // const { _id } = req?.user;
  // console.log(req?.body, "req?.body");

  // validateMongodbID(_id);
  try {
    const user = await Designation.findByIdAndUpdate(
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

const deleteDesignationCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  console.log(id);
  // if (!id) throw new Error("Please provide user ID");

  // check isf user id is valid
  validateMongodbID(id);
  try {
    const deletedUser = await Designation.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = {
  createDesignationCtrl,
  fetchDesignationsCtrl,
  fetchSingleDesignation,
  updateDesignationCtrl,
  deleteDesignationCtrl,
};
