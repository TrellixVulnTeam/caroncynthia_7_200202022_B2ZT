import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_BIO = "UPDATE_BIO";
export const DELETE_USER = "DELETE_USER";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (userId, bio) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
        data: { bio },
      });
      dispatch({ type: UPDATE_BIO, payload: res.data });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const deleteUser = (userId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
    })
      .then((res) => {
        dispatch({ type: DELETE_USER, payload: { userId } });
      })
      .catch((err) => console.log(err));
  };
};
