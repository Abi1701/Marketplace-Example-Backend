const express = require("express");
const router = express.Router();
const {
	login,
	registerUsername,
	registerDatauser,
	findOne,
} = require("../controller/userController");
const auth = require("../middleware/authMiddleware");
router.post("/register", registerUsername);
router.post("/register", registerDatauser);
router.post("/login", login);
router.get("/profile", auth, findOne);

module.exports = router;
