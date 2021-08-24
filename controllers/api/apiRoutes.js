const router = require("express").Router();
const { Workout } = require("../../models");
const db = require("../../models")

router.get("/workouts", async (req, res) => {
  try {
    const data = await db.Workout.find({})
      .sort({ _id: -1 })
      .limit(1);
    const duration = data[0].exercises.reduce((sum, current) => {
      return sum + current.duration;
    }, 0);
    console.log(data[0]);
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

// This route will pull the data from the last workout.
router.put("/workouts/:id", async ({ body, params }, res) => {
  try {
    const data = await db.Workout.updateOne({
      "_id": params.id,
    }, {
      $addToSet: {"exercises": [ body ]}
    })
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

module.exports = router;