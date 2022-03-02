// imports
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
require("./dbconnection");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
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

app.use(express.json());
app.use(cookieParser());

// JWT //

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).json(res.locals.user.rows[0].user_id);
});

// ROUTES //

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// SERVER //
app.listen(process.env.PORT, () => {
  console.log(`Serveur en écoute sur le port ${process.env.PORT} !!`);
});
