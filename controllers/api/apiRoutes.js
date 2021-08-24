const router = require("express").Router();
const { Workout } = require("../../models");
const db = require("../../models")

// This route gets the data for the "last workout display."
router.get("/workouts", async (req, res) => {
  try {
    // Here we get all workouts and then sort from most recent and only take one.
    const data = await db.Workout.find({})
      .sort({ _id: -1 })
      .limit(1);
    // Here we calculate the total duration of all exercises in this workout.
    const duration = data[0].exercises.reduce((sum, current) => {
      return sum + current.duration;
    }, 0);
    // Here we create a new array with the total duration key/value pair.
    const exercise = [
      {
        _id: data[0]._id,
        day: data[0].day,
        totalDuration: duration,
        exercises: data[0].exercises
      }
    ]
    res.json(exercise);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// This route creates an instance of Workout.
router.post("/workouts", async (req, res) => {
  try {
    const data = await db.Workout.create(req);
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
      $addToSet: { "exercises": [body] }
    })
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// This route will get data for the past seven workouts.
router.get("/workouts/range", async (req, res) => {
  try {
    // Here we get all workouts and sort by most recent, add a total duration field, and take the most recent 7.
    const data = await db.Workout.aggregate([
      { $sort: { _id: -1 } },
      { $limit: 7 },
      {
        $addFields: { totalDuration: { $sum: "$exercises.duration" } }
      }
    ]);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;