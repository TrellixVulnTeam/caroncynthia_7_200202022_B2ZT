const router = require("express").Router();
const postController = require("../controllers/post.controller");

router.get("/", postController.readAllPosts);
router.post("/", postController.createPost);
router.put("/:post_id", postController.updatePost);
router.delete("/:post_id", postController.deletePost);

module.exports = router;
