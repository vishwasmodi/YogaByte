const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");
const leaderboard = require("./routes/leaderboard");
const app = express();
const cors = require("cors");
require("dotenv").config();

const { APP_USER, APP_USER_PASSWORD } = process.env;
mongoose
  .connect(
    `mongodb+srv://${APP_USER}:${APP_USER_PASSWORD}@yogabyte.nb1kg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cors());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/leaderboard", leaderboard);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(port, () => console.log("listening to port 5000"));
