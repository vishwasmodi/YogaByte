import * as actions from "./types";
import LeaderboardServices from "../services/leadeboard.service";
import { useDispatch } from "react-redux";

const getLeaderboard = () => (dispatch) => {
  return LeaderboardServices.getLeaderboard().then(
    (res) => {
      const message = "Success!";
      dispatch({
        type: actions.GET_LEADERBOARD_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: actions.SET_MESSAGE,
        payload: message,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

const doneYoga = () => (dispatch) => {
  return LeaderboardServices.doneYoga().then(
    (res) => {
      const message = "Success!";
      dispatchEvent({
        type: actions.DONE_YOGA_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: actions.SET_MESSAGE,
        payload: message,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
    }
  );
};

export default {
  getLeaderboard,
  doneYoga,
};
