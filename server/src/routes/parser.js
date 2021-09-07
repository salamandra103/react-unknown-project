const express = require("express");

const router = express.Router();

const parserController = require("../controllers/parser");

router.get("/", parserController.parserGet);

module.exports = router;
