const express = require("express");

const router = express.Router();

const { verifyAccessToken } = require("../middleware/auth");
const dashboardController = require("../controllers/dashboard");

router.get("/", verifyAccessToken, dashboardController.dashboardGet);
router.post("/", verifyAccessToken, dashboardController.dashboardPost);
router.put("/", verifyAccessToken, dashboardController.dashboardPut);
router.delete("/", verifyAccessToken, dashboardController.dashboardDelete);

module.exports = router;
