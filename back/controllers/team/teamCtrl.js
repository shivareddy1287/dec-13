const generateToken = require("../../config/token/generateToken");

const expressAsyncHandler = require("express-async-handler");
const validateMongodbID = require("../../utils/validateMongodbID");
const Team = require("../../model/team/Team");

//----------------------------------------------------------------
// create Team
//----------------------------------------------------------------

const createTeamCtrl = expressAsyncHandler(async (req, res) => {
  // Business Logic
  console.log(req?.body, "created");
  try {
    const user = await Team.create({
      ...req?.body,
    });
    res.json(user);

    // res.json("user controllers");
  } catch (error) {
    res.json(error);
  }
});

//----------------------------------------------------------------
// Fetch Teams
//----------------------------------------------------------------

const fetchTeamsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const Teams = await Team.find({})
      .populate("addedBy")
      .populate("ModifiedBy");
    res.json(Teams);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// user details
//----------------------------------------------------------------

const fetchSingleTeam = expressAsyncHandler(async (req, res) => {
  // console.log(req.headers);
  const { id } = req.params;
  validateMongodbID(id);

  try {
    const user = await Team.findById(id)

      .populate("addedBy")
      .populate("ModifiedBy");

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// Update Team
//----------------------------------------------------------------

const updateTeamCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req?.params?.id, "params");
  // const { _id } = req?.user;
  // console.log(req?.body, "req?.body");

  // validateMongodbID(_id);
  try {
    const user = await Team.findByIdAndUpdate(
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

const deleteTeamCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  console.log(id);
  // if (!id) throw new Error("Please provide user ID");

  // check isf user id is valid
  validateMongodbID(id);
  try {
    const deletedUser = await Team.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = {
  createTeamCtrl,
  fetchTeamsCtrl,
  fetchSingleTeam,
  updateTeamCtrl,
  deleteTeamCtrl,
};
