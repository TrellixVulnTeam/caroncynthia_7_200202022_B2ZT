import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}jwtid`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUid(result.user_id);
        dispatch(getUser(result.user_id));
      })
      .catch((error) => console.log("error", error));
  }, [dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
