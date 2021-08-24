const router = require("express").Router();

// This route will render the page to add new exercises to a workout.
router.get("/exercise", (req, res) => {
  res.sendFile("exercise.html", { root: "public"});
});

// This route will render the page that holds all the workout stats.
router.get("/stats", (req, res) => {
  res.sendFile("stats.html", { root: "public"});
});

module.exports = router;