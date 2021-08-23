const router = require("express").Router();
// const Workout = require("../models/Workout.js");

/* router.get("/", (req, res) => {
  res.sendFile("../")
}); */

router.get("/stats", (req, res) => {
  res.sendFile("stats.html", { root: "public"});
});

module.exports = router;