import axios from "axios";

let API_URL = "http://localhost:5000/api/leaderboard";

const getLeaderboard = () => {
  return axios.get(API_URL);
};

const doneYoga = (totalTime) => {
  console.log(totalTime);
  return axios.post(API_URL, {
    totalTime: totalTime,
  });
};

export default {
  getLeaderboard,
  doneYoga,
};
