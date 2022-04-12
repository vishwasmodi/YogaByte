import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import { getLeaderboard, doneYoga } from "./leaderboard";

export default combineReducers({
  auth,
  message,
  getLeaderboard,
  doneYoga,
});
