const pool = require("../dbconnection");

// AFFICHER TOUS LES USERS //

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");

    res.status(200).json(allUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// AFFICHER UN PROFIL //

module.exports.userInfo = async (req, res, next) => {
  console.log(req.params);
  try {
    const userId = req.params.user_id;

    const profil = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      userId,
    ]);

    console.log(profil.rows);
    res.status(200).send(profil.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// MODIFIER UN PROFIL //

module.exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const { bio } = req.body;

    const updateProfil = await pool.query(
      "UPDATE users SET bio = $2 WHERE user_id = $1",
      [userId, bio]
    );

    res.status(200).send("Profil modifié avec succès");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

// SUPPRIMER UN PROFIL //

module.exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.user_id;

    const deleteProfil = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [userId]
    );
    res.status(200).send("Profil supprimé avec succès");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};
