import React from "react";
import { useDispatch } from "react-redux";
import { deletePost, getPosts } from "../../actions/posts.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = async () => {
    dispatch(deletePost(props.id));
    window.confirm("Votre post a été supprimé");
    dispatch(getPosts());
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
