import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/posts.actions";
import { isEmpty, timestampParser } from "../Utils";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (content || title) {
      const data = {
        user_id: userData.user_id,
        content: content,
        title: title,
      };

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("veuillez entrer un message");
    }
  };

  const cancelPost = () => {
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data">
            <i class="fa-regular fa-user"></i>
            <NavLink exact to="/profil">
              <h3>{userData.firstname + " " + userData.lastname} </h3>
            </NavLink>
          </div>
          <div className="post-form">
            <textarea
              name="title"
              id="title"
              placeholder="Insérez un titre à votre post..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <textarea
              name="content"
              id="content"
              placeholder="De quoi souhaitez vous parler ?"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            {content || title ? (
              <li className="card-container">
                <div className="card-header">
                  <i class="fa-regular fa-user"></i>
                  <h3>{userData.username}</h3>
                  <span className="post-date">
                    Posté le {timestampParser(Date.now())}
                  </span>
                </div>
                <div className="content">
                  <p className="post-title">{title}</p>
                  <p className="post-content">{content}</p>
                </div>
              </li>
            ) : null}
          </div>
          <div className="btn-send">
            {content || title ? (
              <button className="cancel" onClick={cancelPost}>
                Annuler
              </button>
            ) : null}
            <button className="send" onClick={handlePost}>
              Envoyer
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
