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
  const today = new Date();

  for (var i = 0; i < users.length; i++) {
    if (!users[i].days.includes(today.getDate())) users[i].todaysTime = 0;

    leaderboard.push({
      name: users[i].name,
      email: users[i].email,
      days: users[i].days.length,
      todaysTime: users[i].todaysTime,
    });
  }
  leaderboard.sort(compare);
  res.send(leaderboard);
});

router.post("/", async (req, res) => {
  try {
    console.log("req received", req.body.totalTime);
    const user = await User.findById("62558dacd888d897a7e257d4");
    // if (!user) res.status(400).send("Wrong user");
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const already = user.days.includes(dd);
    if (!already) user.days.push(dd);
    user.todaysTime += req.body.totalTime;
    console.log("time saved = ", user.todaysTime);
    console.log(req.body);
    user.save();
  } catch (e) {
    console.log("Not okay", e);
  }
  res.send("Done");
});

module.exports = router;
