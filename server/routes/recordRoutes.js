const express = require("express");
const router = express.Router();
const RecordController = require("../controllers/recordController");
const upload = require("../middlewares/uploadExcel");
router.post("/", upload.single("record"), RecordController.addRecord);
module.exports = router;
