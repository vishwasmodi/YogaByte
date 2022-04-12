import * as actions from "../actions/types";

export default function messge(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_MESSAGE:
      return { message: payload };
    case actions.CLEAR_MESSAGE:
      return { message: "" };
    default:
      return state;
  }
}
