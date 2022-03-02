import React from "react";
import cookie from "js-cookie";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };
  const logout = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_URL}api/user/logout`,
      requestOptions
    )
      .then((response) => response.text())
      .then(() => removeCookie("jwt"))
      .catch((error) => console.log("error", error));
  };

  return (
    <li onClick={logout}>
      <i class="fa-solid fa-power-off"></i>
    </li>
  );
};

export default Logout;
