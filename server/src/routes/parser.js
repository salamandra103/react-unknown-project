const express = require("express");

const router = express.Router();

const parserController = require("../controllers/parser");

router.get("/parseElement", parserController.parserGet);
router.get("/getPage", parserController.getPage);

module.exports = router;
