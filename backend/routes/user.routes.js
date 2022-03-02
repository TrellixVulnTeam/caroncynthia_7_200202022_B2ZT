const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// AUTH //
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// USER DATABSE //
router.get("/", userController.getAllUsers);
router.get("/:user_id", userController.userInfo);
router.put("/:user_id", userController.updateUser);
router.delete("/:user_id", userController.deleteUser);

module.exports = router;
