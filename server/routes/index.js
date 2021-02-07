const express = require("express");
const router = express.Router();
const recordRouter = require("./recordRoutes");
const performanceRouter = require("./performanceRoutes");
router.get("/", (req, res) => {
  res.send("<h1>Hellow</h1>");
});
router.use("/records", recordRouter);
router.use("/performances", performanceRouter);

module.exports = router;
