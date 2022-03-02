import React from "react";
import Auth from "../components/Auth";

const Home = () => {
  return (
    <div className="home-page">
      <div className="log-container">
        <Auth />
        <div className="img-container">
          <img src="./img/icon-above-font.png" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Home;
