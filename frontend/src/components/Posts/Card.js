import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../../actions/posts.actions";
import { dateParser, isEmpty } from "../Utils";
import DeleteCard from "./DeleteCard";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = async () => {
    if (textUpdate) {
      await dispatch(updatePost(post.post_id, textUpdate));
      dispatch(getPosts());
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post.post_id} id={post.post_id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-username">
            <i class="fa-regular fa-user"></i>
            <h3 className="post-username">
              {!isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user.user_id === post.user_id) return user.username;
                    else return null;
                  })
                  .join("")}
            </h3>
            <span className="post-date">
              {" "}
              Posté le {dateParser(post.created_at)}
            </span>
          </div>
          <div className="card-post">
            <p className="post-title">{post.title}</p>
            {isUpdated === false && (
              <p className="post-content">{post.content}</p>
            )}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.content}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider les modifications
                  </button>
                </div>
              </div>
            )}
          </div>
          {userData.user_id === post.user_id && !userData.isadmin && (
            <div className="update-delete-container">
              <div onClick={() => setIsUpdated(!isUpdated)}>
                <i class="fa-regular fa-pen-to-square"></i>
              </div>
              <DeleteCard id={post.post_id} />
            </div>
          )}
          {userData.isadmin && (
            <div className="update-delete-container">
              <div onClick={() => setIsUpdated(!isUpdated)}>
                <i class="fa-regular fa-pen-to-square"></i>
              </div>
              <DeleteCard id={post.post_id} />
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default Card;
