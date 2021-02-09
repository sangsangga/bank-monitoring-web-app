const e = require("express");
const express = require("express");
const router = require("./routes");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", router);
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
