const express = require("express");

const router = express.Router();

const chatController = require("../controllers/chat");

router.post("/room", chatController.createRoom);
router.get("/room", chatController.getRooms);
router.delete("/room", chatController.deleteRoom);

module.exports = router;
