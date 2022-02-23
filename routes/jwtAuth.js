const router = require ("express").Router();
const pool = require("../dbconnection")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const auth = require("../midleware/auth")
const validInfo = require("../midleware/validInfo")

// S'ENREGISTRER //

router.post("/register", validInfo, async (req, res, next) =>{
    const {firstname, lastname, username, password, email} = req.body;
    try{
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if(user.rows.length > 0){
            return res.status(401).send("Cet email est déjà utilisé")
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (firstname, lastname, username, password, email) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
        [firstname, lastname, username, passwordHash, email]);


        const token = jwtGenerator(newUser.rows[0].user_id)

        res.status(200).send("Utilisateur enregistré avec succès")

    }catch(err){
    console.error(err.message);
    res.status(500).send("Erreur serveur")
    }
});

// S'IDENTIFIER //

router.post("/login", validInfo, async (req, res, next) =>{
try{

const {email, password} = req.body;

const user = await pool.query("SELECT * FROM users WHERE email =$1", [email]);

if(user.rows.length === 0){
    return res.status(401).send("Identifiants incorrects")
}

const validPassword = await bcrypt.compare(password, user.rows[0].password)

if(!validPassword){
    return res.status(401).send("Identifiants incorrects")
}

const token = jwtGenerator(user.rows[0].user_id)

res.status(200).send("Connection au profile réussie")


}catch(err){
    console.error(err.message);
    res.status(500).send("Erreur serveur")
}
})

// AFFICHER UN PROFIL //

router.get("/:user_id", async (req, res, next) =>{
    try {
        const userId = parseInt(req.params.user_id);

        const profil = pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        return profil[0]


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur serveur")
    }
})
// const getUserById = (req, res, next) =>{
//     const id = parseInt(req.params.user_id);
//     pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) =>{
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     });
// };

module.exports = router;