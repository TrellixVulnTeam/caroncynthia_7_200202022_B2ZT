// imports
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
require("./dbconnection");
const { checkUser } = require("./midleware/auth");
const { requireAuth } = require("./midleware/auth");

// instantiations
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// Transforme les données arrivant de la requête POST en un objet JSON facilement exploitable
app.use(express.json());
app.use(cookieParser());

// JWT //

app.get("*", checkUser);
app.get("/jwtid", checkUser, (req, res) => {
  return res.json(req.userId);
});

// ROUTES //

// S'enregistrer ou s'identifier
app.use("/auth", require("./routes/jwtAuth"));

// Créer, modifier, supprimer son profil ou ses posts
app.use("/profil", require("./routes/users"));
app.use("/profil", require("./routes/userPosts"));

// Voir tous les posts de tous le monde
app.use("/posts", require("./routes/allPosts"));

// lancement du serveur
app.listen(process.env.PORT, () => {
  console.log(`Serveur en écoute sur le port ${process.env.PORT} !!`);
});
