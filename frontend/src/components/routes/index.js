import React from "react";
import { Routes, Route } from "react-router-dom";
import Gifs from "../../pages/Gifs";
import Home from "../../pages/Home";
import Posts from "../../pages/Posts";
import Profil from "../../pages/Profil";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/gifs" element={<Gifs />} />
    </Routes>
  );
};

export default index;
