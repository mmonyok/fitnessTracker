const router = require("express").Router();
const { Workout } = require("../../models");
const db = require("../../models")

router.get("/workouts", async (req, res) => {
  try {
    const data = await db.Workout.find({})
      .sort({ _id: -1 })
      .limit(1);
    console.log(data.day);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

// This route creates an instance of Workout.
router.post("/workouts", async (req, res) => {
  try {
    const data = await db.Workout.create(req);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;