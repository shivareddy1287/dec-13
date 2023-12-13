const generateToken = require("../../config/token/generateToken");

const expressAsyncHandler = require("express-async-handler");
const validateMongodbID = require("../../utils/validateMongodbID");
const Benefit = require("../../model/benefit/Benefit");
const {
  backNormalAdminAccessGivenFun,
} = require("../../utils/restrictBack/restrictedAccessBack");

//----------------------------------------------------------------
// create benefit
//----------------------------------------------------------------

const createBenefitCtrl = expressAsyncHandler(async (req, res) => {
  // Business Logic
  console.log(req?.body, "created");
  try {
    const user = await Benefit.create({
      ...req?.body,
    });
    res.json(user);

    // res.json("user controllers");
  } catch (error) {
    res.json(error);
  }
  // try {
  //   const Benefit = await Benefit.create({ user: userId, addedBy: adminId });
  //   res.json(Benefit);
  // } catch (error) {
  //   console.error(error);
  //   res.json(error);
  // }
});

//----------------------------------------------------------------
// Fetch Benefits
//----------------------------------------------------------------

const fetchBenefitsCtrl = expressAsyncHandler(async (req, res) => {
  const isAdmin = backNormalAdminAccessGivenFun(req?.user?.Access);
  const query = req?.query?.id
    ? { user: req?.query?.id }
    : isAdmin
    ? {}
    : { user: req?.user?.id };

  try {
    const Benefits = await Benefit.find(query)
      .populate("user")
      .populate("addedBy")
      .populate("ModifiedBy");
    res.json(Benefits);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// user details
//----------------------------------------------------------------

const fetchSingleBenefit = expressAsyncHandler(async (req, res) => {
  // console.log(req.headers);
  const { id } = req.params;
  validateMongodbID(id);

  try {
    const user = await Benefit.findById(id)
      .populate("user")
      .populate("addedBy")
      .populate("ModifiedBy");

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//----------------------------------------------------------------
// Update Benefit
//----------------------------------------------------------------

const updateBenefitCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req?.params?.id, "params");
  // const { _id } = req?.user;
  console.log(req?.body, "req?.body");

  // validateMongodbID(_id);
  try {
    const user = await Benefit.findByIdAndUpdate(
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

const deleteBenefitCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  console.log(id);
  // if (!id) throw new Error("Please provide user ID");

  // check isf user id is valid
  validateMongodbID(id);
  try {
    const deletedUser = await Benefit.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = {
  createBenefitCtrl,
  fetchBenefitsCtrl,
  fetchSingleBenefit,
  updateBenefitCtrl,
  deleteBenefitCtrl,
};
