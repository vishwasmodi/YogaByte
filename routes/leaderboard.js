const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User } = require("../models/user");

function compare(a, b) {
  if (a.days > b.days) {
    return -1;
  }
  if (a.days < b.days) {
    return 1;
  }
  return 0;
}

router.get("/", async (req, res) => {
  const users = await User.find();
  var leaderboard = [];
  for (var i = 0; i < users.length; i++) {
    leaderboard.push({
      name: users[i].name,
      email: users[i].email,
      days: users[i].days.length,
    });
  }
  leaderboard.sort(compare);
  res.send(leaderboard);
});

router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) res.status(400).send("Wrong user");
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const already = user.days.includes(dd);
  if (already) return res.status(400).send("Already done today");
  user.days.push(dd);
  user.save();
  res.send("Done");
});

module.exports = router;
