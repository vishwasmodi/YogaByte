import * as actions from "../actions/types";

const initialLeaderboard = {
  leaderboard: [],
  loading: false,
};

const initialDoneYoga = {
  totalTime: 0,
};

export function getLeaderboard(state = initialLeaderboard, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_LEADERBOARD_SUCCESS:
      return {
        ...state,
        leaderboard: payload,
        loading: false,
      };
    case actions.GET_LEADERBOARD_FAIL:
      return state;
    default:
      return state;
  }
}

export function doneYoga(state = initialDoneYoga, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.DONE_YOGA_SUCCESS:
      return {
        ...state,
        totalTime: payload,
        loading: false,
      };
    case actions.DONE_YOGA_FAIL:
      return state;
    default:
      return state;
  }
}
