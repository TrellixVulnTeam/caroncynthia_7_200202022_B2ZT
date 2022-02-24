const router = require("express").Router();
const pool = require("../dbconnection");


// RECUPERER TOUS LES POSTS //

router.get("/", async (req, res, next) =>{
    try {
        const allPosts = await pool.query("SELECT * FROM posts")

        console.log(allPosts.rows)
        res.status(200).send("Tous les posts sont affichées")

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Erreur server")
    }
});

module.exports = router;