const express = require("express");

const router = express.Router();

const { verifyAccessToken } = require("../middleware/auth");
const userController = require("../controllers/user");

router.get("/", verifyAccessToken, userController.getUserInfo);
router.post("/", verifyAccessToken, userController.setUserInfo);

module.exports = router;
