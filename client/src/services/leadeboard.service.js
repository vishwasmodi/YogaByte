import axios from "axios";

let API_URL = "http://localhost:5000/api/leaderboard";

const getLeaderboard = () => {
  return axios.get(API_URL);
};

const doneYoga = () => {
  return axios.post(API_URL, {});
};

export default {
  getLeaderboard,
  doneYoga,
};
