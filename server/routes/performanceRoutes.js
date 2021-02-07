const express = require("express");
const router = express.Router();
const RecordController = require("../controllers/recordController");

router.get("/", RecordController.findAllPerformance);

module.exports = router;
