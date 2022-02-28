import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Auth/Logout";

const Navbar = () => {
  var myHeaders = new Headers();

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    credentials: "include",
    redirect: "follow",
  };

  fetch("http://localhost:5000/profil/user_id", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/posts">
            <div className="logo">
              <img src="./img/icon.png" alt="logo" />
              <h5>Groupomania</h5>
            </div>
          </NavLink>
        </div>
        <ul>
          <li>
            <NavLink exact to="/posts">
              <h5>Posts</h5>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/gifs">
              <h5>Gifs</h5>
            </NavLink>
          </li>
          <li className="welcome">
            <NavLink exact to="/profil">
              <h5>Bienvenue 'Valeur Dynamique'</h5>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/">
              <Logout />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
