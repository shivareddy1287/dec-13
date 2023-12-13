const generateToken = require("../../config/token/generateToken");

const expressAsyncHandler = require("express-async-handler");
const validateMongodbID = require("../../utils/validateMongodbID");
const Department = require("../../model/department/Department");

//----------------------------------------------------------------
// create Department
//----------------------------------------------------------------

const createDepartmentCtrl = expressAsyncHandler(async (req, res) => {
  // Business Logic
  console.log(req?.body, "created");
  try {
    const user = await Department.create({
      ...req?.body,
    });
    res.json(user);

    // res.json("user controllers");
  } catch (error) {
    res.json(error);
  }
});

//----------------------------------------------------------------
// Fetch Departments
//----------------------------------------------------------------

const fetchDepartmentsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const Departments = await Department.find({})
      .populate("addedBy")
      .populate("ModifiedBy");
    res.json(Departments);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// user details
//----------------------------------------------------------------

const fetchSingleDepartment = expressAsyncHandler(async (req, res) => {
  // console.log(req.headers);
  const { id } = req.params;
  validateMongodbID(id);

  try {
    const user = await Department.findById(id)

      .populate("addedBy")
      .populate("ModifiedBy");

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// Update Department
//----------------------------------------------------------------

const updateDepartmentCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req?.params?.id, "params");
  // const { _id } = req?.user;
  // console.log(req?.body, "req?.body");

  // validateMongodbID(_id);
  try {
    const user = await Department.findByIdAndUpdate(
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

const deleteDepartmentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  console.log(id);
  // if (!id) throw new Error("Please provide user ID");

  // check isf user id is valid
  validateMongodbID(id);
  try {
    const deletedUser = await Department.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = {
  createDepartmentCtrl,
  fetchDepartmentsCtrl,
  fetchSingleDepartment,
  updateDepartmentCtrl,
  deleteDepartmentCtrl,
};
