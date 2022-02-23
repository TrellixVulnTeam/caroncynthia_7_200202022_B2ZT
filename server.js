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

app.use("/auth", require("./routes/jwtAuth"));
app.use("/profil", require("./routes/users"));

// lancement du serveur
app.listen(process.env.PORT, () => {
console.log(`Serveur en écoute sur le port ${process.env.PORT} !!`)
});


