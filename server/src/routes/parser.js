const express = require("express");

const router = express.Router();

const { verifyAccessToken } = require("../middleware/auth");
const parserController = require("../controllers/parser");

router.get("/", parserController.parserGet);

module.exports = router;
