const router = require ("express").Router();
const pool = require("../dbconnection")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const auth = require("../midleware/auth")


// AFFICHER UN PROFIL //

router.get("/:user_id", auth, async (req, res, next) =>{
    try {
        const userId = parseInt(req.params.user_id);

        const profil = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        res.status(200).json(profil.rows)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur serveur")
    }
})

// MODIFIER UN PROFIL //

router.put("/:user_id", auth, async (req, res, next) =>{
    try {
        const userId = parseInt(req.params.user_id);
        const {username, bio, firstname, lastname} = req.body;

        const updateProfil = await pool.query('UPDATE users SET username = $2, bio = $3, firstname = $4, lastname =$5 WHERE user_id = $1', 
        [userId, username, bio, firstname, lastname]);
        res.status(200).send("Profil modifié avec succès")
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur serveur")
    }
})

// SUPPRIMER UN PROFIL //

router.delete("/:user_id", auth, async (req, res, next) =>{
    try {
        const userId = req.params.user_id;

        const deleteProfil = await pool.query("DELETE FROM users WHERE user_id = $1", 
        [userId]);
        res.status(200).send("Profil supprimé avec succès")
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur serveur")
    }
})


module.exports = router;