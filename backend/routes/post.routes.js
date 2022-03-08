const router = require("express").Router();
const postController = require("../controllers/post.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.get("/", postController.readAllPosts);
router.post("/", requireAuth, postController.createPost);
router.put("/:post_id", requireAuth, postController.updatePost);
router.delete("/:post_id", requireAuth, postController.deletePost);

module.exports = router;
