const pool = require("../dbconnection");

// RECUPERER TOUS LES POSTS //

module.exports.readAllPosts = async (req, res, next) => {
  try {
    const allPosts = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    res.status(200).json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur server");
  }
};

// TOUS LES POSTS D'UNE PERSONNE //

// module.exports.readPost = async (req, res, next) => {
//   try {
//     // const user = await pool.query("SELECT username FROM users WHERE user_id = $1", [req.user.id]);

//     const user = await pool.query(
//       "SELECT users.username, posts.post_id, posts.content, posts.media, posts.created_at FROM users LEFT JOIN posts ON users.user_id = posts.user_id WHERE users.user_id = $1",
//       [req.body.user_id]
//     );

//     res.json(user.rows);
//   } catch (err) {
//     console.error(err.message);

//     res.status(500).json("Erreur server");
//   }
// };

// CREER UN NOUVEAU POST //

module.exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const id = req.body.user_id;

    const newPost = await pool.query(
      "INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, id]
    );

    console.log(newPost.rows[0]);
    res.status(200).json({ newUser: JSON.stringify(newPost.rows[0]) });
  } catch (err) {
    console.error(err.message);

    res.status(500).json("Erreur server");
  }
};

// MODIFIER UN POST //

module.exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.post_id;
    const content = req.body.content;

    const updatePost = await pool.query(
      "UPDATE posts SET content = $1 WHERE post_id =$2 RETURNING *",
      [content, postId]
    );

    console.log(req.body);
    console.log(updatePost.rows[0].user_id);
    if (updatePost.rows[0].user_id === req.token || req.isadmin === true) {
      res.status(200).send(content);
    } else {
      return res.json(
        "Ce post n'est pas le votre, vous ne pouvez pas le modifier"
      );
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur server");
  }
};

// SUPPRIMER UN POST //

module.exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.post_id;

    const deletePost = await pool.query(
      "DELETE FROM posts WHERE post_id = $1 RETURNING *",
      [postId]
    );

    if (deletePost.rows[0].user_id === req.token || req.isadmin === true) {
      res.status(200).send("ce post a bien été supprimé");
    } else {
      return res.json(
        "Ce post n'est pas le votre, vous ne pouvez pas le supprimer"
      );
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur server");
  }
};
