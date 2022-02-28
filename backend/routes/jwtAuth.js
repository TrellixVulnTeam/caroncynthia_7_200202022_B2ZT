const router = require("express").Router();
const pool = require("../dbconnection");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const jwt = require("jsonwebtoken");
const auth = require("../midleware/auth");
const validInfo = require("../midleware/validInfo");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: maxAge,
  });
};

// S'ENREGISTRER //

router.post("/register", validInfo, async (req, res, next) => {
  const { firstname, lastname, username, password, email } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(401).send("Cet email est déjà utilisé");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (firstname, lastname, username, password, email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstname, lastname, username, passwordHash, email]
    );

    res.status(200).send("Utilisateur enregistré avec succès");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

// S'IDENTIFIER //

router.post("/login", validInfo, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email =$1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).send("Identifiants incorrects");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).send("Identifiants incorrects");
    }

    const token = createToken(user.rows[0].user_id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user.rows[0].user_id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.get("/logout", (req, res, next) => {
  return res
    .clearCookie("jwt")
    .status(200)
    .json({ message: "Déconnexion réalisée avec succès" });
});

module.exports = router;
