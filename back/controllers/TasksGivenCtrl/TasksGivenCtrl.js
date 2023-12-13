const generateToken = require("../../config/token/generateToken");

const expressAsyncHandler = require("express-async-handler");
const validateMongodbID = require("../../utils/validateMongodbID");
const TasksGiven = require("../../model/TasksGiven/TasksGiven");

//----------------------------------------------------------------
// create TasksGiven
//----------------------------------------------------------------

const createTasksGivenCtrl = expressAsyncHandler(async (req, res) => {
  // Business Logic
  console.log(req?.body, "created");
  try {
    const user = await TasksGiven.create({
      ...req?.body,
    });
    res.json(user);

    // res.json("user controllers");
  } catch (error) {
    res.json(error);
  }
  // try {
  //   const TasksGiven = await TasksGiven.create({ user: userId, addedBy: adminId });
  //   res.json(TasksGiven);
  // } catch (error) {
  //   console.error(error);
  //   res.json(error);
  // }
});

//----------------------------------------------------------------
// Fetch TasksGivens
//----------------------------------------------------------------

const fetchTasksGivensCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.query.id;
  const query = {}; // Initialize an empty query object

  if (id) {
    (query.taskAssignedUser = id), (query.taskGivenUser = id); // Add a filter for the user ID if provided
  }

  try {
    const TasksGivens = await TasksGiven.find(query)
      .populate("taskGivenUser")
      .populate("taskAssignedUser");

    res.json(TasksGivens);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// user details
//----------------------------------------------------------------

const fetchSingleTasksGiven = expressAsyncHandler(async (req, res) => {
  // console.log(req.headers);
  const { id } = req.params;
  validateMongodbID(id);

  try {
    const user = await TasksGiven.findById(id)
      .populate("taskGivenUser")
      .populate("taskAssignedUser");

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// Update TasksGiven
//----------------------------------------------------------------

const updateTasksGivenCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req?.params?.id, "params");
  // const { _id } = req?.user;
  // console.log(req?.body, "req?.body");

  // validateMongodbID(_id);
  try {
    const user = await TasksGiven.findByIdAndUpdate(
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

const deleteTasksGivenCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  console.log(id);
  // if (!id) throw new Error("Please provide user ID");

  // check isf user id is valid
  validateMongodbID(id);
  try {
    const deletedUser = await TasksGiven.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = {
  createTasksGivenCtrl,
  fetchTasksGivensCtrl,
  fetchSingleTasksGiven,
  updateTasksGivenCtrl,
  deleteTasksGivenCtrl,
};
