import { DELETE_USER, GET_USER, UPDATE_BIO } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case DELETE_USER:
      return state.filter((user) => user.id);
    default:
      return state;
  }
}
