import React from "react";
import Navbar from "../components/Navbar";
import NewPostForm from "../components/Posts/NewPostForm";
import Thread from "../components/Thread";

const Posts = () => {
  return (
    <>
      <Navbar />
      <div className="new-post">
        <NewPostForm />
      </div>
      <div className="posts">
        <Thread />
      </div>
    </>
  );
};

export default Posts;
