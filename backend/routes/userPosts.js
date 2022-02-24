const router = require("express").Router();
const pool = require("../dbconnection");
const auth = require("../midleware/auth");

// TOUS LES POSTS D'UNE PERSONNE //

router.get("/", auth, async (req, res, next) =>{
    try {
        
        // const user = await pool.query("SELECT username FROM users WHERE user_id = $1", [req.user.id]);


        const user = await pool.query("SELECT users.username, posts.post_id, posts.content, posts.media, posts.created_at FROM users LEFT JOIN posts ON users.user_id = posts.user_id WHERE users.user_id = $1", [req.user.id])
        
        res.json(user.rows)

    } catch (err) {
        console.error(err.message);
        
        res.status(500).json("Erreur server")
    }
});

// CREER UN NOUVEAU POST //

router.post("/post", auth, async (req, res, next) =>{
    try {
        
        const {title, content, media} = req.body;
        const id = req.user.id

        const newPost = await pool.query("INSERT INTO posts (title, content, media, user_id) VALUES ($1, $2, $3, $4) RETURNING *", [title, content, media, id]);

        console.log(newPost.rows[0])
        res.status(200).send("Post créé avec succès")

    } catch (err) {
        console.error(err.message);
        
        res.status(500).json("Erreur server")
    }
});


// MODIFIER UN POST //

router.put("/post/:post_id", auth, async (req, res, next) =>{
    try {
        const postId = parseInt(req.params.post_id);
        const userId = req.user.id
        const {title, content, media } = req.body;

        const updatePost = await pool.query("UPDATE posts SET title = $1, content = $2, media =$3 WHERE post_id =$4 and user_id = $5 RETURNING *", [title, content, media, postId, userId]);

        if(updatePost.rows.length === 0){
            return res.json("Ce post n'est pas le votre, vous ne pouvez pas le modifier")
        }

        res.status(200).send("Post modifié avec succès")

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Erreur server")
    }
});

// SUPPRIMER UN POST //

router.delete("/post/:post_id", auth, async (req, res, next) =>{
    try {
        const postId = parseInt(req.params.post_id);
        const userId = req.user.id

        const deletePost = await pool.query("DELETE FROM posts WHERE post_id = $1 and user_id = $2 RETURNING *", [postId, userId]);
       
        if(deletePost.rows.length === 0){
            return res.json("Ce post n'est pas le votre, vous ne pouvez pas le supprimer")
        }

        res.status(200).send("Post supprimé avec succès")

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Erreur server")
    }
});

module.exports = router;