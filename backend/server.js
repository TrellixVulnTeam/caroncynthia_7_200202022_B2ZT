// imports
const express = require('express');
const cors = require('cors');
require('dotenv').config({path:'./config/.env'});

// instantiations
const app = express();

// Transforme les données arrivant de la requête POST en un objet JSON facilement exploitable
app.use(express.json());
// middleware
app.use(cors());


// ROUTES // 

// S'enregistrer ou s'identifier
app.use("/auth", require("./routes/jwtAuth"));

// Créer, modifier, supprimer son profil ou ses posts
app.use("/profil", require("./routes/users"));
app.use("/profil", require("./routes/userPosts"));

// Voir tous les posts de tous le monde
app.use("/posts", require("./routes/allPosts"))



// lancement du serveur
app.listen(process.env.PORT, () => {
console.log(`Serveur en écoute sur le port ${process.env.PORT} !!`)
});


