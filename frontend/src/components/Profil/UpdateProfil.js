import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.actions";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer[0]);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData.user_id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <h1>Profil de {userData.username} </h1>
      <div className="profil-info">
        {<h3>Prénom : {userData.firstname}</h3>}
        <h3>Nom: {userData.lastname}</h3>
        <div className="bio-update">
          <h3>Bio: </h3>
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
      </div>
    </div>
  );
};

export default UpdateProfil;
