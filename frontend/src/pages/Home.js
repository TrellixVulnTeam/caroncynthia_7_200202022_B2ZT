import React, { useContext } from "react";
import Auth from "../components/Auth";
import { UidContext } from "../components/AppContext";

const Home = () => {
  const uid = useContext(UidContext);

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
