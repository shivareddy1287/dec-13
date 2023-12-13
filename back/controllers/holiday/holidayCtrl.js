const expressAsyncHandler = require("express-async-handler");
const Holiday = require("../../model/holiday/holiday");

const addholidayCtrl = expressAsyncHandler(async (req, res) => {
  console.log("Yes 1");

  try {
    const holiday = await Holiday.create({
      ...req.body,
    });
    res.json(holiday);
  } catch (error) {
    res.json(error, error.message);
  }
});

const fetchHolidayCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(typeof id);
  console.log(id);
  try {
    const holiday = await Holiday.findById(id);
    res.json(holiday);
  } catch (error) {
    res.json(error.message);
  }
});

const updateHolidayCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const holiday = await Holiday.findByIdAndUpdate(id, { ...req.body });
    // console.log(holiday);
    res.json(holiday);
  } catch (error) {
    res.json(error.message);
  }
});

const fetchholidaysCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const holidays = await Holiday.find({}).sort({ fromDate: 1 });
    res.json(holidays);
  } catch (error) {
    res.json(error.message);
  }
});

// Delete Holiday
const deleteHolidayCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const holiday = await Holiday.findByIdAndDelete(id);
    console.log(holiday);
    res.json(holiday);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  addholidayCtrl,
  fetchholidaysCtrl,
  fetchHolidayCtrl,
  updateHolidayCtrl,
  deleteHolidayCtrl,
};
