import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logout from "./Auth/Logout";

const Navbar = () => {
  const userData = useSelector((state) => state.userReducer);

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
        {userData ? (
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
                <h5>Bienvenue {userData.firstname}</h5>
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/">
                <Logout />
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <NavLink exact to="/">
              <h5>Se connecter</h5>
            </NavLink>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
