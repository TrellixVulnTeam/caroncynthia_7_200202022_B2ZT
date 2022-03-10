import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser, updateBio } from "../../actions/user.actions";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleUpdate = () => {
    dispatch(updateBio(userData.user_id, bio));
    setUpdateForm(false);
  };

  const deleteProfilUser = () => {
    dispatch(deleteUser(userData.user_id));
    window.confirm("Votre compte a été supprimé");
    navigate("/");
  };

  return (
    <div className="profil-container">
      <h1>Profil de {userData.username} </h1>
      <div className="profil-info">
        {
          <h3>
            Prénom : <span>{userData.firstname}</span>
          </h3>
        }
        <h3>
          Nom: <span>{userData.lastname}</span>
        </h3>
        <div className="bio-update">
          <h3>Bio </h3>
          {updateForm === false && (
            <>
              <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
              <button onClick={() => setUpdateForm(!updateForm)}>
                Modifier la Bio
              </button>
            </>
          )}
          {updateForm && (
            <>
              <textarea
                type="text"
                defaultValue={userData.bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <button onClick={handleUpdate}>Valider les modifications</button>
            </>
          )}
        </div>
        <button
          onClick={() => {
            if (
              window.confirm(
                "êtes vous sûr de bien vouloir supprimer votre compte Groupomania ?"
              )
            ) {
              deleteProfilUser();
            }
          }}
        >
          Supprimer le profil
        </button>
      </div>
    </div>
  );
};

export default UpdateProfil;
