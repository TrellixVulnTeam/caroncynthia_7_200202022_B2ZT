import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, getPosts } from "../../actions/posts.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const deleteQuote = async () => {
    dispatch(deletePost(props.id));
    dispatch(getPosts());
    window.confirm("Votre post a été supprimé");
    navigate("/posts");
  };

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce post ?")) {
          deleteQuote();
        }
      }}
    >
      <i class="fa-regular fa-trash-can"></i>
    </div>
  );
};

export default DeleteCard;
